import type { Metadata } from 'next'
import Link from 'next/link'
import { CATEGORIES, DIFFICULTY_LABEL, type Competition } from '@/lib/competitions'
import ScrollReveal from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Competition Problems',
  description:
    'รวมลิงก์ข้อสอบแข่งขันคณิตศาสตร์ทั่วโลก — IMO, AMC, AIME, APMO, สอวน., PAT1, HMMT และอื่นๆ พร้อมเฉลย',
  openGraph: {
    title: 'Competition Problems · Point of Math',
    description: 'รวมลิงก์ข้อสอบแข่งขันคณิตศาสตร์ทั่วโลก — IMO AMC AIME APMO สอวน. PAT1',
  },
}

const DIFFICULTY_BAR = (n: number) => (
  <div className="flex items-center gap-0.5" aria-label={`Difficulty ${n}/5`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <div
        key={i}
        className={`w-3 h-1.5 ${i <= n ? 'bg-ink' : 'bg-rule'}`}
      />
    ))}
    <span className="font-mono text-[10px] uppercase tracking-widest text-muted ml-2">
      {DIFFICULTY_LABEL[n]}
    </span>
  </div>
)

function CompetitionCard({ c }: { c: Competition }) {
  return (
    <div className="border border-rule bg-white hover:border-ink hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Header */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-sans text-[15px] font-semibold text-ink leading-tight">
              {c.name}
            </h3>
            {c.nameThai && (
              <p className="font-sans text-[12px] text-muted mt-0.5">{c.nameThai}</p>
            )}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest border border-rule text-muted px-2 py-1 shrink-0">
            {c.region}
          </span>
        </div>

        <p className="font-sans text-[13px] text-muted leading-relaxed">
          {c.description}
        </p>

        {/* Topics */}
        <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
          {c.topics.map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-rule p-4 flex flex-col gap-3">
        {DIFFICULTY_BAR(c.difficulty)}

        <div className="flex items-center gap-2">
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-3 py-2.5 text-center hover:bg-muted transition-colors"
          >
            Official Problems →
          </a>
          {c.aopsUrl && c.aopsUrl !== c.url && (
            <a
              href={c.aopsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] uppercase tracking-widest border border-rule text-muted px-3 py-2.5 text-center hover:border-ink hover:text-ink transition-colors"
              title="AoPS Solutions"
            >
              Solutions
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProblemsPage() {
  const totalCompetitions = CATEGORIES.reduce((s, c) => s + c.competitions.length, 0)

  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule relative overflow-hidden">
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          ∫
        </div>
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Section · Competition Problems
          </div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Problems
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            รวมลิงก์ข้อสอบแข่งขันคณิตศาสตร์จากทั่วโลก {totalCompetitions} รายการ
            — คลิกเพื่อไปยังแหล่งข้อสอบจริงและเฉลย
          </p>

          {/* Level legend */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`w-2.5 h-1 ${i <= n ? 'bg-ink' : 'bg-rule'}`} />
                  ))}
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                  {DIFFICULTY_LABEL[n]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 flex flex-col gap-20">
        {CATEGORIES.map((cat, ci) => (
          <ScrollReveal key={cat.id} delay={ci * 60}>
            <section>
              {/* Category header */}
              <div className="flex items-end justify-between gap-4 mb-8 pb-5 border-b border-rule">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                    {cat.labelThai}
                  </div>
                  <h2 className="font-serif italic text-[28px] md:text-[36px] text-ink leading-tight">
                    {cat.label}
                  </h2>
                </div>
                <span className="font-mono text-[11px] text-muted shrink-0">
                  {cat.competitions.length} รายการ
                </span>
              </div>

              {/* Competition grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.competitions.map((c) => (
                  <CompetitionCard key={c.id} c={c} />
                ))}
              </div>
            </section>
          </ScrollReveal>
        ))}
      </div>

      {/* Bottom note */}
      <div className="border-t border-rule bg-paper">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-8">
          <p className="font-sans text-[13px] text-muted leading-relaxed max-w-2xl">
            ลิงก์ทั้งหมดชี้ไปยังแหล่งข้อสอบทางการหรือ{' '}
            <a
              href="https://artofproblemsolving.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink underline underline-offset-2 hover:opacity-70"
            >
              Art of Problem Solving
            </a>{' '}
            ซึ่งเป็นแหล่งรวมเฉลยที่ใหญ่ที่สุดในโลก
            หากต้องการแบบฝึกหัดเรียงหน่วยตามหลักสูตร สอวน. ดูที่{' '}
            <Link href="/sheets" className="text-ink underline underline-offset-2 hover:opacity-70">
              Free Sheets →
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
