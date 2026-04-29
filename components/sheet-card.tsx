import type { Topic, Difficulty } from '@/lib/sheets'

interface SheetCardProps {
  unit: number
  title: string
  level: string
  topic: Topic
  difficulty: Difficulty
  downloadUrl: string
}

export default function SheetCard({ unit, title, topic, downloadUrl }: SheetCardProps) {
  const unitLabel = unit.toString().padStart(2, '0')

  return (
    <div className="flex items-baseline gap-6 py-5 border-b border-rule group">
      <span className="font-mono text-[13px] text-muted shrink-0 w-7 tabular-nums">
        {unitLabel}
      </span>

      <div className="flex-1 min-w-0">
        <span className="font-sans text-[15px] text-ink group-hover:opacity-60 transition-opacity">
          {title}
        </span>
      </div>

      <span className="hidden sm:block font-mono text-[11px] uppercase tracking-widest text-muted shrink-0">
        {topic}
      </span>

      <a
        href={downloadUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="font-mono text-[11px] uppercase tracking-widest text-ink shrink-0 hover:opacity-50 transition-opacity"
      >
        PDF →
      </a>
    </div>
  )
}
