'use client'

import { useState, useEffect } from 'react'
import { upcomingExams, type ExamEvent } from '@/lib/exam-dates'

type EnrichedEvent = ExamEvent & { days: number; date: Date }

const REGION_STYLE: Record<string, string> = {
  Thailand:       'bg-ink text-paper',
  'Asia-Pacific': 'border border-ink text-ink',
  International:  'border border-ink text-ink',
  USA:            'border border-rule text-muted',
  Europe:         'border border-rule text-muted',
}

function regionStyle(region: string) {
  return REGION_STYLE[region] ?? 'border border-rule text-muted'
}

function formatDate(date: Date) {
  return date.toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function HeroCard({ ev }: { ev: EnrichedEvent }) {
  return (
    <a
      href={ev.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-ink p-8 hover:bg-ink hover:text-paper group transition-colors"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-muted group-hover:text-paper/50 mb-4">
        Next Up
      </div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-6">
        <div>
          <div className="font-mono text-[80px] leading-none font-bold text-ink group-hover:text-paper tabular-nums">
            {ev.days}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted group-hover:text-paper/50 mt-1">
            days remaining
          </div>
        </div>
        <div className="sm:mb-2">
          <h2 className="font-sans text-[28px] font-semibold text-ink group-hover:text-paper leading-tight">
            {ev.name}
          </h2>
          {ev.nameFull && (
            <p className="font-mono text-[11px] text-muted group-hover:text-paper/60 mt-0.5">
              {ev.nameFull}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3 flex-wrap">
            <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-[3px] ${regionStyle(ev.region)}`}>
              {ev.region}
            </span>
            <span className="font-mono text-[11px] text-muted group-hover:text-paper/60">
              {formatDate(ev.date)}
            </span>
            {ev.note && (
              <span className="font-mono text-[10px] text-muted group-hover:text-paper/50 italic">
                {ev.note}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-ink group-hover:text-paper underline underline-offset-4">
        ดูรายละเอียด / สมัคร →
      </div>
    </a>
  )
}

function EventRow({ ev }: { ev: EnrichedEvent }) {
  return (
    <a
      href={ev.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-start gap-5 border-b border-rule py-5 hover:bg-paper/60 transition-colors px-1"
    >
      {/* Days */}
      <div className="shrink-0 w-20 text-right">
        <span className="font-mono text-[32px] font-bold text-ink leading-none tabular-nums">
          {ev.days}
        </span>
        <div className="font-mono text-[9px] uppercase tracking-widest text-muted">days</div>
      </div>

      {/* Divider */}
      <div className="w-px self-stretch bg-rule shrink-0" />

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-1">
          <h3 className="font-sans text-[16px] font-semibold text-ink group-hover:underline underline-offset-2">
            {ev.name}
          </h3>
          <span className={`font-mono text-[9px] uppercase tracking-widest px-1.5 py-[2px] shrink-0 ${regionStyle(ev.region)}`}>
            {ev.region}
          </span>
        </div>
        {ev.nameFull && (
          <p className="font-mono text-[11px] text-muted leading-snug">{ev.nameFull}</p>
        )}
        {ev.note && (
          <p className="font-mono text-[10px] text-muted/70 italic mt-1">{ev.note}</p>
        )}
      </div>

      {/* Date */}
      <div className="shrink-0 text-right hidden sm:block">
        <div className="font-mono text-[11px] text-muted">{formatDate(ev.date)}</div>
        <div className="font-mono text-[10px] text-ink mt-1 group-hover:underline underline-offset-2">
          ดูรายละเอียด →
        </div>
      </div>
    </a>
  )
}

export default function CompetitionsClient() {
  const [events, setEvents] = useState<EnrichedEvent[]>([])

  useEffect(() => {
    setEvents(upcomingExams(50))
  }, [])

  if (events.length === 0) return null

  const [hero, ...rest] = events

  return (
    <div>
      {/* Hero — next competition */}
      <HeroCard ev={hero} />

      {/* All upcoming */}
      <div className="mt-10">
        <div className="flex items-center gap-4 mb-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
            All Upcoming · เรียงตามวันที่ใกล้ที่สุด
          </span>
          <div className="flex-1 h-px bg-rule" />
        </div>

        <div>
          {rest.map((ev) => (
            <EventRow key={ev.id} ev={ev} />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="mt-12 border-t border-rule pt-6">
        <p className="font-sans text-[13px] text-muted leading-relaxed max-w-2xl">
          วันที่เป็นค่าประมาณจากปีก่อน — ตรวจสอบกำหนดการจริงที่เว็บไซต์ผู้จัดก่อนสมัคร ·{' '}
          <a href="/problems" className="text-ink underline underline-offset-2 hover:opacity-70">
            ดูข้อสอบเก่า →
          </a>
        </p>
      </div>
    </div>
  )
}
