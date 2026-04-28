import type { Metadata } from 'next'
import PapersClient from '@/components/papers-client'
import { paperGroups } from '@/lib/papers'

export const metadata: Metadata = {
  title: 'Past Papers · Point of Math',
  description: 'ข้อสอบเก่า SAT, สอวน., PAT1, AMC, พสวท. ดาวน์โหลดฟรี',
}

export default function PapersPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="text-[11px] uppercase tracking-widest text-muted">
            Section · Past Papers
          </div>
          <h1 className="mt-4 text-[36px] md:text-[56px] leading-none font-bold uppercase tracking-tight text-ink">
            Past Papers
          </h1>
          <div className="mt-6 h-px w-full bg-ink" />
          <p className="mt-6 text-[14px] tracking-wide text-muted max-w-2xl">
            รวมข้อสอบเก่าจากการสอบแข่งขันคณิตศาสตร์ทั้งในและต่างประเทศ
            เลือกชุดที่ต้องการแล้วดาวน์โหลดเป็น PDF.
          </p>
        </div>
      </section>

      {/* Client: search + filter + list */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <PapersClient groups={paperGroups} />
        </div>
      </section>
    </div>
  )
}
