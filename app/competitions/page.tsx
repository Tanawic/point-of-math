import type { Metadata } from 'next'
import CompetitionsClient from './competitions-client'

export const metadata: Metadata = {
  title: 'Upcoming Competitions · Point of Math',
  description:
    'ตารางการแข่งขันคณิตศาสตร์ที่กำลังจะมาถึง — สอวน. TIMO AMC APMO IMO KVIS PAT1 พร้อมวันที่และลิงก์สมัคร',
  openGraph: {
    title: 'Upcoming Competitions · Point of Math',
    description: 'ตารางการแข่งขันคณิตศาสตร์ที่กำลังจะมาถึง — นับถอยหลังทุกรายการ',
  },
}

export default function CompetitionsPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule relative overflow-hidden">
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          ◷
        </div>
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Section · Upcoming Competitions
          </div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Competitions
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            ตารางการแข่งขันคณิตศาสตร์ที่กำลังจะมาถึง —{' '}
            <strong className="text-ink">นับถอยหลังแบบ real-time</strong>{' '}
            พร้อมลิงก์สมัครและรายละเอียดแต่ละรายการ
          </p>
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { v: 'Thailand', d: 'สอวน. · TIMO · KVIS · PAT1' },
              { v: 'Regional', d: 'APMO · HKIMO · AMC' },
              { v: 'International', d: 'IMO · JBMO · AIME' },
            ].map((s) => (
              <div key={s.v} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-ink" />
                <span className="font-mono text-[11px] text-ink">{s.v}</span>
                <span className="font-mono text-[11px] text-muted">· {s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive competitions list */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-10">
        <CompetitionsClient />
      </section>
    </div>
  )
}
