import type { Topic, Difficulty } from '@/lib/sheets'

interface SheetCardProps {
  unit: number
  title: string
  level: string
  topic: Topic
  difficulty: Difficulty
  downloadUrl: string
}

const difficultyStyle: Record<Difficulty, string> = {
  Medium:   'border border-rule text-muted',
  Hard:     'border border-ink text-ink',
  Olympiad: 'bg-ink text-paper',
}

export default function SheetCard({
  unit,
  title,
  level,
  topic,
  difficulty,
  downloadUrl,
}: SheetCardProps) {
  const unitLabel = unit.toString().padStart(2, '0')

  return (
    <div className="border border-rule bg-white flex flex-col hover:border-ink transition-colors">
      <div
        className="flex items-center justify-center h-28 text-[48px] font-bold tracking-tight text-ink"
        style={{ backgroundColor: '#EAEAEA' }}
      >
        {unitLabel}
      </div>

      <div className="flex flex-col gap-3 p-5 flex-1">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]">
            {level}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]">
            {topic}
          </span>
          <span className={`text-[10px] uppercase tracking-widest px-2 py-[2px] ${difficultyStyle[difficulty]}`}>
            {difficulty}
          </span>
        </div>

        <h3 className="text-[14px] font-medium text-ink leading-snug min-h-[2.6em]">{title}</h3>

        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto text-[11px] uppercase tracking-widest border border-ink text-ink px-3 py-2 text-center hover:bg-ink hover:text-paper transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  )
}
