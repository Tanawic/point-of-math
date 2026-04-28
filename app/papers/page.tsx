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
      <section className="border-b border-rule relative overflow-hidden">
        {/* Decorative background symbol */}
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          □
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Section · Past Papers
          </div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Past Papers
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            รวมข้อสอบเก่าจากการสอบแข่งขันคณิตศาสตร์ทั้งในและต่างประเทศ
            ดาวน์โหลดเป็น PDF ได้เลย ฟรีทุกชุด.
          </p>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <PapersClient groups={paperGroups} />
        </div>
      </section>
    </div>
  )
}
