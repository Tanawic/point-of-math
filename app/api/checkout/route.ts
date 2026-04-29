import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getCourse } from '@/lib/courses'

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-04-22.dahlia',
  })
  const { courseId } = await req.json()

  const course = getCourse(courseId)
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'https://pointofmath.com'

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card', 'promptpay'],
    line_items: [
      {
        price_data: {
          currency: 'thb',
          unit_amount: course.price * 100, // satang
          product_data: {
            name: course.title,
            description: course.tagline,
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url:  `${origin}/courses`,
    metadata: { courseId },
    billing_address_collection: 'required',
    custom_fields: [
      {
        key: 'full_name',
        label: { type: 'custom', custom: 'ชื่อ-นามสกุล' },
        type: 'text',
      },
    ],
  })

  return NextResponse.json({ url: session.url })
}
