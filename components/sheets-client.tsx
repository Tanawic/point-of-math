'use client'

import { useState, useMemo, useEffect } from 'react'
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

const STORAGE_KEY = 'pom_downloaded'
const TOTAL = 15

function useDownloadProgress() {
  const [downloaded, setDownloaded] = useState<string[]>([])

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      setDownloaded(Array.isArray(saved) ? saved : [])
    } catch {
      setDownloaded([])
    }
  }, [])

  const track = (slug: string) => {
    setDownloaded((prev) => {
      if (prev.includes(slug)) return prev
      const next = [...prev, slug]
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }

  return { downloaded, track }
}

export default function SheetsClient({ sheets }: { sheets: Sheet[] }) {
  const [active, setActive] = useState<Filter>('All')
  const { downloaded, track } = useDownloadProgress()

  const filtered = useMemo(
    () => (active === 'All' ? sheets : sheets.filter((s) => s.topic === active)),
    [sheets, active]
  )

  const countFor = (t: Filter) =>
    t === 'All' ? sheets.length : sheets.filter((s) => s.topic === t).length

  const pct = Math.round((downloaded.length / TOTAL) * 100)
  const showCTA = downloaded.length >= 10 && downloaded.length < TOTAL

  return (
    <div>
      {/* Download progress bar */}
      {downloaded.length > 0 && (
        <div className="mb-10 border border-rule p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-ink">
              คุณดาวน์โหลดแล้ว {downloaded.length}/{TOTAL} ชีท
            </span>
            <span className="font-mono text-[11px] text-muted">{pct}%</span>
          </div>
          <div className="h-1.5 bg-rule overflow-hidden">
            <div
              className="h-full bg-ink transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
          {showCTA && (
            <p className="mt-3 font-sans text-[13px] text-muted">
              เก่งมาก! ลองเพิ่มระดับด้วย{' '}
              <a href="/courses" className="text-ink underline underline-offset-2 hover:opacity-70">
                คอร์สเชิงลึก →
              </a>
            </p>
          )}
          {downloaded.length === TOTAL && (
            <p className="mt-3 font-sans text-[13px] text-ink font-medium">
              ครบทุกหน่วยแล้ว! 🎯 พร้อมลุยคอร์สโอลิมปิก —{' '}
              <a href="/courses" className="underline underline-offset-2 hover:opacity-70">
                ดูคอร์ส →
              </a>
            </p>
          )}
        </div>
      )}

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

      {/* Sheet grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {filtered.map((s) => (
          <SheetCard
            key={s.slug}
            unit={s.unit}
            slug={s.slug}
            title={s.title}
            level={s.level}
            topic={s.topic}
            difficulty={s.difficulty}
            downloadUrl={s.downloadUrl}
            isDownloaded={downloaded.includes(s.slug)}
            onDownload={track}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="border border-dashed border-rule px-6 py-16 text-center">
          <p className="font-sans text-[13px] text-muted">ไม่พบแบบฝึกหัดในหัวข้อนี้</p>
        </div>
      )}
    </div>
  )
}
