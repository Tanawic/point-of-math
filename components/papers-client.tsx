'use client'

import { useState, useMemo } from 'react'
import PaperCard from './paper-card'
import type { PaperGroup, CompetitionKey } from '@/lib/papers'

type FilterKey = 'All' | CompetitionKey

const filterLabels: Record<FilterKey, string> = {
  All:  'ทั้งหมด',
  SAT:  'SAT',
  POSN: 'สอวน.',
  PAT1: 'PAT1',
  AMC:  'AMC',
  PCSN: 'พสวท.',
}

const competitionIcon: Record<string, string> = {
  SAT:  '□',
  POSN: '◇',
  PAT1: '○',
  AMC:  '✦',
  PCSN: '△',
}

export default function PapersClient({ groups }: { groups: PaperGroup[] }) {
  const [competition, setCompetition] = useState<FilterKey>('All')
  const [query, setQuery] = useState('')

  const availableFilters: FilterKey[] = [
    'All',
    ...groups.filter((g) => !g.comingSoon).map((g) => g.competitionKey),
  ]

  const filtered = useMemo(() => {
    return groups
      .filter((g) => competition === 'All' || g.competitionKey === competition)
      .map((g) => ({
        ...g,
        papers: g.papers.filter((p) =>
          p.title.toLowerCase().includes(query.toLowerCase())
        ),
      }))
  }, [groups, competition, query])

  return (
    <div>
      {/* Search + filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-14 pb-8 border-b border-rule">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[13px] text-muted pointer-events-none">
            /
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="ค้นหาข้อสอบ..."
            className="w-full border border-rule bg-white pl-9 pr-4 py-2.5 font-sans text-[14px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-ink transition-colors"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((key) => (
            <button
              key={key}
              onClick={() => setCompetition(key)}
              className={`font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 border transition-colors flex items-center gap-1.5 ${
                competition === key
                  ? 'bg-ink text-paper border-ink'
                  : 'border-rule text-muted hover:border-ink hover:text-ink'
              }`}
            >
              {key !== 'All' && (
                <span className="opacity-60">{competitionIcon[key]}</span>
              )}
              {filterLabels[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Paper groups */}
      <div className="flex flex-col gap-14">
        {filtered.map((group) => (
          <div key={group.competitionKey}>

            {/* Group header */}
            <div className="flex items-center gap-4 border-b border-ink pb-3 mb-6">
              <span className="font-mono text-[20px] text-muted opacity-40" aria-hidden>
                {competitionIcon[group.competitionKey]}
              </span>
              <h2 className="font-sans text-[18px] md:text-[20px] font-semibold text-ink flex-1">
                {group.competition}
              </h2>
              {group.comingSoon && (
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px] shrink-0">
                  Coming Soon
                </span>
              )}
            </div>

            {group.description && (
              <p className="font-sans text-[13px] text-muted mb-5">{group.description}</p>
            )}

            <div className="flex flex-col gap-3">
              {group.papers.length > 0 ? (
                group.papers.map((p) => (
                  <PaperCard
                    key={p.id}
                    title={p.title}
                    competition={p.competition}
                    year={p.year}
                    difficulty={p.difficulty}
                    downloadUrl={p.downloadUrl}
                    answersUrl={p.answersUrl}
                  />
                ))
              ) : (
                <div className="border border-dashed border-rule px-6 py-10 text-center">
                  <p className="font-sans text-[13px] text-muted">
                    {query
                      ? 'ไม่พบข้อสอบที่ตรงกับการค้นหา'
                      : 'กำลังจัดเตรียมข้อสอบชุดนี้ — โปรดติดตามเร็วๆ นี้'}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
