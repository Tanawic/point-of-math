import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ขอบคุณ! · Point of Math',
}

export default function SuccessPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-lg w-full text-center flex flex-col items-center gap-8">

        {/* Icon */}
        <div className="w-16 h-16 bg-ink rounded-full flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M6 14.5l5.5 5.5 10.5-12" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted mb-3">
            Payment Successful
          </div>
          <h1 className="font-serif italic text-[40px] md:text-[56px] leading-tight text-ink">
            ขอบคุณมากครับ!
          </h1>
          <div className="mt-4 h-px bg-rule" />
        </div>

        <div className="font-sans text-[15px] text-muted leading-relaxed text-left w-full">
          <p className="mb-4">
            เราได้รับการชำระเงินของคุณแล้ว —
            ตรวจสอบอีเมลเพื่อรับลิงก์เข้าถึงคอร์ส
            <strong className="text-ink"> ภายใน 5 นาที</strong>
          </p>
          <p>
            หากไม่ได้รับอีเมล กรุณาตรวจสอบโฟลเดอร์สแปม
            หรือติดต่อ{' '}
            <a href="mailto:pointofmathcontacts@gmail.com" className="text-ink underline underline-offset-4">
              pointofmathcontacts@gmail.com
            </a>
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/sheets"
            className="flex-1 font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-6 py-3.5 text-center hover:bg-ink hover:text-paper transition-colors"
          >
            แบบฝึกหัดฟรี
          </Link>
          <Link
            href="/"
            className="flex-1 font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-6 py-3.5 text-center hover:bg-muted transition-colors"
          >
            กลับหน้าหลัก →
          </Link>
        </div>
      </div>
    </div>
  )
}
