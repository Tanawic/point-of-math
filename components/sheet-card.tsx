'use client'

import type { Topic, Difficulty } from '@/lib/sheets'
import { TopicIcon, TopicBgSymbol } from '@/components/topic-icon'

interface SheetCardProps {
  unit: number
  slug: string
  title: string
  level: string
  topic: Topic
  difficulty: Difficulty
  downloadUrl: string
  isDownloaded?: boolean
  onDownload?: (slug: string) => void
}

const difficultyStyle: Record<Difficulty, string> = {
  Medium:   'border border-rule text-muted',
  Hard:     'border border-ink text-ink',
  Olympiad: 'bg-ink text-paper',
}

export default function SheetCard({
  unit, slug, title, level, topic, difficulty, downloadUrl, isDownloaded, onDownload,
}: SheetCardProps) {
  const unitLabel = unit.toString().padStart(2, '0')
  const apiUrl = `/api/download/${slug}`

  return (
    <div className={`border flex flex-col hover:-translate-y-0.5 transition-all duration-200 ${
      isDownloaded ? 'border-ink bg-white' : 'border-rule bg-white hover:border-ink'
    }`}>

      {/* Card header — mirrors the PDF cover design */}
      <div className="relative overflow-hidden" style={{ backgroundColor: '#EEEBE6' }}>
        {/* Dark top bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-ink">
          <span className="font-serif italic text-[10px] text-paper/80 leading-none">
            Point of Math
          </span>
          {isDownloaded && (
            <span className="font-mono text-[8px] uppercase tracking-widest text-paper/60">
              ✓ saved
            </span>
          )}
        </div>

        {/* Cover body */}
        <div className="relative px-4 pt-3 pb-4">
          {/* Watermark symbol */}
          <span
            className="absolute bottom-0 right-2 font-mono leading-none text-ink select-none pointer-events-none text-[68px]"
            style={{ opacity: 0.07 }}
            aria-hidden
          >
            <TopicBgSymbol topic={topic} />
          </span>

          {/* Unit number */}
          <span className="font-mono font-bold text-[42px] leading-none text-ink block">
            {unitLabel}
          </span>

          {/* Topic in small-caps style */}
          <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted block mt-1">
            {topic}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex flex-wrap gap-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]">
            {level}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]">
            {topic}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-[2px] ${difficultyStyle[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <h3 className="font-sans text-[14px] font-medium text-ink leading-snug min-h-[2.4em]">
          {title}
        </h3>

        <a
          href={apiUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onDownload?.(slug)}
          className={`mt-auto font-mono text-[11px] uppercase tracking-widest px-3 py-2.5 text-center transition-colors ${
            isDownloaded
              ? 'bg-ink text-paper hover:bg-muted'
              : 'border border-ink text-ink hover:bg-ink hover:text-paper'
          }`}
        >
          {isDownloaded ? '↓ Download Again' : 'Download PDF'}
        </a>
      </div>
    </div>
  )
}
