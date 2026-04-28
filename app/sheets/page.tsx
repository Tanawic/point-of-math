import type { Metadata } from 'next'
import SheetsClient from '@/components/sheets-client'
import { sheets } from '@/lib/sheets'

export const metadata: Metadata = {
  title: 'Free Sheets · Point of Math',
  description: 'แบบฝึกหัดคณิตศาสตร์ 15 หน่วย ตามหลักสูตรสอวน. ดาวน์โหลดฟรี',
}

export default function SheetsPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="text-[11px] uppercase tracking-widest text-muted">
            Section · Free Sheets
          </div>
          <h1 className="mt-4 text-[36px] md:text-[56px] leading-none font-bold uppercase tracking-tight text-ink">
            Free Sheets
          </h1>
          <div className="mt-6 h-px w-full bg-ink" />
          <p className="mt-6 text-[14px] tracking-wide text-muted max-w-2xl">
            แบบฝึกหัดคณิตศาสตร์ 15 หน่วย เรียงตามหลักสูตรค่ายสอวน.
            กรองตามหัวข้อที่ต้องการฝึก.
          </p>
        </div>
      </section>

      {/* Client: topic filter + grid */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <SheetsClient sheets={sheets} />
        </div>
      </section>
    </div>
  )
}
