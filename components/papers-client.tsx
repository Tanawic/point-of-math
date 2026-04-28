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

export default function PapersClient({ groups }: { groups: PaperGroup[] }) {
  const [competition, setCompetition] = useState<FilterKey>('All')
  const [query, setQuery] = useState('')

  const availableFilters: FilterKey[] = [
    'All',
    ...groups
      .filter((g) => !g.comingSoon)
      .map((g) => g.competitionKey),
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
      {/* Search + filter bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-14 border-b border-rule pb-8">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาข้อสอบ..."
          className="flex-1 border border-rule bg-white px-4 py-2 text-[13px] text-ink placeholder:text-muted focus:outline-none focus:border-ink"
        />
        <div className="flex flex-wrap gap-2">
          {availableFilters.map((key) => (
            <button
              key={key}
              onClick={() => setCompetition(key)}
              className={`text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors ${
                competition === key
                  ? 'bg-ink text-paper border-ink'
                  : 'border-rule text-ink hover:border-ink'
              }`}
            >
              {filterLabels[key]}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="flex flex-col gap-14">
        {filtered.map((group) => (
          <div key={group.competitionKey}>
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
              <p className="mt-3 text-[13px] text-muted">{group.description}</p>
            )}

            <div className="mt-6 flex flex-col gap-3">
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
                <div className="border border-dashed border-rule px-5 py-8 text-center">
                  <p className="text-[13px] text-muted tracking-wide">
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
