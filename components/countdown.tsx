'use client'

import { useState, useEffect } from 'react'
import { upcomingExams } from '@/lib/exam-dates'

const REGION_COLOR: Record<string, string> = {
  Thailand:        'bg-ink text-paper',
  'School Open':   'border border-dashed border-ink text-ink',
  'Asia-Pacific':  'border border-ink text-ink',
  International:   'border border-ink text-ink',
  USA:             'border border-rule text-muted',
  Europe:          'border border-rule text-muted',
}

function regionStyle(region: string) {
  return REGION_COLOR[region] ?? 'border border-rule text-muted'
}

export default function CountdownWidget() {
  const [exams, setExams] = useState<ReturnType<typeof upcomingExams>>([])

  useEffect(() => {
    // Compute client-side so dates are always accurate
    setExams(upcomingExams(6))
  }, [])

  if (exams.length === 0) return null

  const next = exams[0]

  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-10">

        {/* Section header */}
        <div className="flex items-center gap-4 mb-6">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            Upcoming Exams
          </span>
          <div className="flex-1 h-px bg-rule" />
        </div>

        {/* Hero next exam */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end gap-4">
          <div>
            <div className="font-mono text-[80px] sm:text-[100px] leading-none font-bold text-ink tabular-nums">
              {next.days}
            </div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted mt-1">
              days until
            </div>
          </div>
          <div className="sm:mb-3">
            <div className="font-sans text-[22px] font-semibold text-ink leading-tight">
              {next.name}
            </div>
            {next.nameFull && (
              <div className="font-mono text-[11px] text-muted mt-0.5">{next.nameFull}</div>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-[3px] ${regionStyle(next.region)}`}>
                {next.region}
              </span>
              {next.note && (
                <span className="font-mono text-[10px] text-muted">{next.note}</span>
              )}
            </div>
          </div>
        </div>

        {/* Row of upcoming exams */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px border border-rule bg-rule">
          {exams.slice(1).map((ev) => (
            <a
              key={ev.id}
              href={ev.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-paper p-4 hover:bg-ink hover:text-paper group transition-colors"
            >
              <div className="font-mono text-[28px] font-bold leading-none group-hover:text-paper text-ink tabular-nums">
                {ev.days}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted group-hover:text-paper/70 mt-0.5">
                days
              </div>
              <div className="font-sans text-[13px] font-medium text-ink group-hover:text-paper mt-2 leading-tight">
                {ev.name}
              </div>
              <div className="font-mono text-[9px] text-muted group-hover:text-paper/60 mt-0.5 uppercase tracking-widest">
                {ev.region}
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
