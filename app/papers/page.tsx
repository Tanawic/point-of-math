import type { Metadata } from 'next'
import PaperCard from '@/components/paper-card'
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

      {/* Groups */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 flex flex-col gap-16">
          {paperGroups.map((group) => (
            <div key={group.competition}>
              <div className="flex items-baseline justify-between gap-6 border-b border-ink pb-3">
                <h2 className="text-[18px] md:text-[20px] font-medium text-ink">
                  {group.competition}
                </h2>
                {group.comingSoon && (
                  <span className="text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px] shrink-0">
                    Coming Soon
                  </span>
                )}
              </div>

              {group.description && (
                <p className="mt-3 text-[13px] text-muted">
                  {group.description}
                </p>
              )}

              <div className="mt-6 flex flex-col gap-3">
                {group.papers.length > 0 ? (
                  group.papers.map((p) => (
                    <PaperCard
                      key={p.id}
                      title={p.title}
                      competition={p.competition}
                      year={p.year}
                      downloadUrl={p.downloadUrl}
                      answersUrl={p.answersUrl}
                    />
                  ))
                ) : (
                  <div className="border border-dashed border-rule px-5 py-8 text-center">
                    <p className="text-[13px] text-muted tracking-wide">
                      กำลังจัดเตรียมข้อสอบชุดนี้ — โปรดติดตามเร็วๆ นี้
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
