import { Resend } from 'resend'
import type { Course } from './courses'

export async function sendCourseAccessEmail(params: {
  toEmail: string
  toName: string
  course: Course
}): Promise<void> {
  const resend = new Resend(process.env.RESEND_API_KEY)
  const FROM   = process.env.EMAIL_FROM ?? 'Point of Math <noreply@pointofmath.com>'
  const { toEmail, toName, course } = params

  const videoLinks = course.videoUrls.length > 0
    ? course.videoUrls.map((url, i) => `<li><a href="${url}">บทที่ ${i + 1}</a></li>`).join('\n')
    : '<li>วิดีโอกำลังเตรียม — คุณจะได้รับลิงก์ภายใน 24 ชั่วโมง</li>'

  const html = `
<!DOCTYPE html>
<html lang="th">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F8F5F0;font-family:'Segoe UI',sans-serif;color:#0A0A0A;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #E3DED8;max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:#0A0A0A;padding:32px 40px;">
          <p style="margin:0;font-family:Georgia,serif;font-style:italic;font-size:22px;color:#F8F5F0;letter-spacing:-0.5px;">
            Point of Math
          </p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#7A7672;">
            สวัสดีครับ/ค่ะ คุณ <strong style="color:#0A0A0A;">${toName}</strong>
          </p>

          <h1 style="margin:0 0 8px;font-size:26px;font-weight:700;line-height:1.2;">
            ยืนยันการเข้าถึงคอร์ส
          </h1>
          <p style="margin:0 0 32px;font-size:15px;color:#7A7672;">${course.titleThai}</p>

          <hr style="border:none;border-top:1px solid #E3DED8;margin:0 0 32px;">

          <p style="margin:0 0 12px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#7A7672;">
            ลิงก์วิดีโอคอร์ส
          </p>
          <ul style="margin:0 0 32px;padding:0 0 0 20px;font-size:15px;line-height:2;">
            ${videoLinks}
          </ul>

          <p style="margin:0 0 12px;font-size:14px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#7A7672;">
            สิ่งที่รวมอยู่ในคอร์ส
          </p>
          <ul style="margin:0 0 32px;padding:0 0 0 20px;font-size:15px;line-height:2;color:#0A0A0A;">
            ${course.includes.map((i) => `<li>${i}</li>`).join('\n')}
          </ul>

          <p style="margin:0 0 32px;font-size:14px;color:#7A7672;line-height:1.7;">
            หากมีปัญหาหรือคำถาม ติดต่อได้ที่
            <a href="mailto:pointofmathcontacts@gmail.com" style="color:#0A0A0A;">pointofmathcontacts@gmail.com</a>
          </p>

          <hr style="border:none;border-top:1px solid #E3DED8;margin:0 0 32px;">
          <p style="margin:0;font-size:13px;color:#7A7672;">
            ขอบคุณที่สนับสนุน Point of Math 🙏<br>
            ทุกบาทช่วยให้เราสร้างสื่อคณิตศาสตร์ฟรีให้น้องๆ คนอื่นต่อไปได้
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:24px 40px;background:#F8F5F0;border-top:1px solid #E3DED8;">
          <p style="margin:0;font-size:12px;color:#7A7672;text-align:center;">
            Point of Math · pointofmath.com · ฟรีทั้งหมด · pointofmath.com
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
    subject: `✅ คุณเข้าถึงคอร์ส "${course.title}" ได้แล้ว — Point of Math`,
    html,
  })

  if (error) {
    console.error('[mailer] Resend error:', error)
    throw new Error(`Email send failed: ${error.message}`)
  }
}
