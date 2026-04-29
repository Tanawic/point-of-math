import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getCourse } from '@/lib/courses'
import { notifyOwner, buildPurchaseMessage } from '@/lib/telegram'
import { sendCourseAccessEmail } from '@/lib/mailer'

// Stripe requires raw body for signature verification
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  })

  const rawBody = await req.text()
  const sig     = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const courseId     = session.metadata?.courseId ?? ''
    const studentEmail = session.customer_details?.email ?? ''
    const studentName  = (
      session.custom_fields?.find((f) => f.key === 'full_name')?.text?.value ??
      session.customer_details?.name ??
      'นักเรียน'
    )
    const amount   = session.amount_total ?? 0
    const currency = session.currency ?? 'thb'

    const course = getCourse(courseId)
    if (!course) {
      console.error('[webhook] unknown courseId:', courseId)
      return NextResponse.json({ received: true })
    }

    // 1. Notify owner via Telegram
    await notifyOwner(
      buildPurchaseMessage({ studentName, studentEmail, courseTitle: course.title, amount, currency })
    )

    // 2. Send access email to student
    if (studentEmail) {
      await sendCourseAccessEmail({ toEmail: studentEmail, toName: studentName, course })
    }
  }

  return NextResponse.json({ received: true })
}
