import type { Metadata } from 'next'
import SheetsClient from '@/components/sheets-client'
import { sheets } from '@/lib/sheets'

export const metadata: Metadata = {
  title: 'Free Sheets',
  description:
    'แบบฝึกหัดคณิตศาสตร์ 15 หน่วย ตามหลักสูตรสอวน. — ทฤษฎีจำนวน พีชคณิต เรขาคณิต การนับ ตรรกศาสตร์ ดาวน์โหลดฟรี',
  openGraph: {
    title: 'Free Sheets · Point of Math',
    description: 'แบบฝึกหัดโอลิมปิก 15 หน่วย ตามหลักสูตรสอวน. ดาวน์โหลดฟรี ไม่ต้องสมัคร',
  },
}

export default function SheetsPage() {
  return (
    <div>
      <section className="border-b border-rule relative overflow-hidden">
        {/* Decorative background symbol */}
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          △
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Section · Free Sheets
          </div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Free Sheets
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            แบบฝึกหัด 15 หน่วย เรียงตามหลักสูตรค่ายสอวน.
            กรองตามสาขาที่ต้องการฝึก.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <SheetsClient sheets={sheets} />
        </div>
      </section>
    </div>
  )
}
