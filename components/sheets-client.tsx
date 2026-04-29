'use client'

import { useState, useMemo } from 'react'
import SheetCard from './sheet-card'
import { TOPICS } from '@/lib/sheets'
import type { Sheet, Topic } from '@/lib/sheets'

type Filter = Topic | 'All'

const topicLabel: Record<Filter, string> = {
  All:              'ทั้งหมด',
  'Number Theory':  'Number Theory',
  'Algebra':        'Algebra',
  'Geometry':       'Geometry',
  'Combinatorics':  'Combinatorics',
  'Logic':          'Logic',
}

export default function SheetsClient({ sheets }: { sheets: Sheet[] }) {
  const [active, setActive] = useState<Filter>('All')

  const filtered = useMemo(
    () => (active === 'All' ? sheets : sheets.filter((s) => s.topic === active)),
    [sheets, active]
  )

  const countFor = (t: Filter) =>
    t === 'All' ? sheets.length : sheets.filter((s) => s.topic === t).length

  return (
    <div>
      {/* Topic filter pills */}
      <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-rule">
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`font-mono text-[11px] uppercase tracking-widest px-4 py-2.5 border transition-colors flex items-center gap-2 ${
              active === t
                ? 'bg-ink text-paper border-ink'
                : 'border-rule text-muted hover:border-ink hover:text-ink'
            }`}
          >
            {topicLabel[t]}
            <span className={`text-[10px] ${active === t ? 'text-paper/50' : 'text-muted/60'}`}>
              {countFor(t)}
            </span>
          </button>
        ))}
      </div>

      {/* Sheet list */}
      <div>
        {filtered.map((s) => (
          <SheetCard
            key={s.slug}
            unit={s.unit}
            title={s.title}
            level={s.level}
            topic={s.topic}
            difficulty={s.difficulty}
            downloadUrl={s.downloadUrl}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="font-mono text-[13px] text-muted py-12">ไม่พบแบบฝึกหัดในหัวข้อนี้</p>
      )}
    </div>
  )
}
