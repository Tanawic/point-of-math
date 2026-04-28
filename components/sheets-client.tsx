'use client'

import { useState, useMemo } from 'react'
import SheetCard from './sheet-card'
import { TOPICS } from '@/lib/sheets'
import type { Sheet, Topic } from '@/lib/sheets'

type Filter = Topic | 'All'

const topicCount = (sheets: Sheet[], topic: Topic) =>
  sheets.filter((s) => s.topic === topic).length

export default function SheetsClient({ sheets }: { sheets: Sheet[] }) {
  const [active, setActive] = useState<Filter>('All')

  const filtered = useMemo(
    () => (active === 'All' ? sheets : sheets.filter((s) => s.topic === active)),
    [sheets, active]
  )

  return (
    <div>
      {/* Topic tabs */}
      <div className="flex flex-wrap gap-2 mb-10 border-b border-rule pb-8">
        {TOPICS.map((t) => {
          const count = t === 'All' ? sheets.length : topicCount(sheets, t)
          return (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`text-[11px] uppercase tracking-widest px-4 py-2 border transition-colors flex items-center gap-2 ${
                active === t
                  ? 'bg-ink text-paper border-ink'
                  : 'border-rule text-ink hover:border-ink'
              }`}
            >
              {t === 'All' ? 'ทั้งหมด' : t}
              <span className={`text-[10px] ${active === t ? 'text-paper/60' : 'text-muted'}`}>
                {count}
              </span>
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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
        <div className="border border-dashed border-rule px-5 py-16 text-center">
          <p className="text-[13px] text-muted">ไม่พบแบบฝึกหัดในหัวข้อนี้</p>
        </div>
      )}
    </div>
  )
}
