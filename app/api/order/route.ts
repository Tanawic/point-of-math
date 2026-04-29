import { NextRequest, NextResponse } from 'next/server'
import { getCourse } from '@/lib/courses'
import { notifyOwner } from '@/lib/telegram'
import { sendCourseAccessEmail } from '@/lib/mailer'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  let formData: FormData
  try {
    formData = await req.formData()
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
  }

  const courseId = formData.get('courseId') as string
  const name     = (formData.get('name') as string)?.trim()
  const email    = (formData.get('email') as string)?.trim()
  const phone    = (formData.get('phone') as string)?.trim() ?? ''
  const slipFile = formData.get('slip') as File | null

  if (!courseId || !name || !email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const course = getCourse(courseId)
  if (!course) {
    return NextResponse.json({ error: 'Course not found' }, { status: 404 })
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN!
  const chatId   = process.env.TELEGRAM_CHAT_ID!

  // 1. Send slip photo to Telegram (with caption)
  if (slipFile && botToken && chatId) {
    try {
      const bytes  = await slipFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const tgForm = new FormData()
      tgForm.append('chat_id', chatId)
      tgForm.append(
        'caption',
        `💰 *ออเดอร์ใหม่*\n` +
        `📚 คอร์ส: ${course.title}\n` +
        `👤 ชื่อ: ${name}\n` +
        `📧 อีเมล: ${email}\n` +
        `📱 โทร: ${phone || '-'}\n` +
        `💵 ราคา: ${course.priceDisplay}`,
      )
      tgForm.append('parse_mode', 'Markdown')
      tgForm.append(
        'photo',
        new Blob([buffer], { type: slipFile.type }),
        slipFile.name || 'slip.jpg',
      )
      await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: tgForm,
      })
    } catch (err) {
      console.error('[order] Telegram photo send failed:', err)
    }
  } else if (botToken && chatId) {
    // No slip — send text only
    await notifyOwner(
      `💰 ออเดอร์ใหม่ (ไม่มีสลิป)\n` +
      `📚 ${course.title}\n` +
      `👤 ${name} | ${email} | ${phone || '-'}\n` +
      `💵 ${course.priceDisplay}`,
    )
  }

  // 2. Send confirmation email to student (no video links yet — pending verification)
  try {
    await sendOrderConfirmEmail({ toEmail: email, toName: name, course })
  } catch (err) {
    console.error('[order] confirmation email failed:', err)
  }

  return NextResponse.json({ ok: true })
}

// ── Confirmation email (pending verification state) ───────────────────────────
async function sendOrderConfirmEmail(params: {
  toEmail: string
  toName: string
  course: { title: string; titleThai?: string }
}) {
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM   = process.env.EMAIL_FROM ?? 'Point of Math <noreply@pointofmath.com>'
  const { toEmail, toName, course } = params

  const html = `
<!DOCTYPE html>
<html lang="th">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:'Segoe UI',sans-serif;color:#0A0A0A;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E3DED8;max-width:600px;width:100%;">
        <tr><td style="background:#0A0A0A;padding:32px 40px;">
          <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:22px;color:#F8F5F0;">Point of Math</p>
        </td></tr>
        <tr><td style="padding:40px;">
          <p style="margin:0 0 24px;font-size:15px;color:#7A7672;">
            สวัสดีครับ/ค่ะ คุณ <strong style="color:#0A0A0A;">${toName}</strong>
          </p>
          <h1 style="margin:0 0 8px;font-size:24px;font-weight:700;">ได้รับสลิปของคุณแล้ว ✓</h1>
          <p style="margin:0 0 24px;font-size:15px;color:#7A7672;">${course.title}</p>
          <hr style="border:none;border-top:1px solid #E3DED8;margin:0 0 24px;">
          <p style="font-size:15px;line-height:1.7;color:#0A0A0A;">
            เราได้รับสลิปการโอนเงินของคุณแล้ว<br>
            หลังจากตรวจสอบยอดโอนแล้ว จะส่ง <strong>ลิงก์วิดีโอคอร์ส</strong>
            ไปที่อีเมลนี้ภายใน <strong>24 ชั่วโมง</strong>
          </p>
          <p style="font-size:14px;color:#7A7672;margin-top:24px;">
            หากมีคำถาม ติดต่อได้ที่
            <a href="mailto:05351@pccm.ac.th" style="color:#0A0A0A;">05351@pccm.ac.th</a>
          </p>
        </td></tr>
        <tr><td style="padding:24px 40px;background:#F8F5F0;border-top:1px solid #E3DED8;">
          <p style="margin:0;font-size:12px;color:#7A7672;text-align:center;">
            Point of Math · pointofmath.com
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`

  const { error } = await resend.emails.send({
    from: FROM,
    to: toEmail,
    subject: `ได้รับสลิปแล้ว — ${course.title} · Point of Math`,
    html,
  })

  if (error) throw new Error(error.message)
}
