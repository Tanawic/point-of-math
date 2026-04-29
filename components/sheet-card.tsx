import type { Topic, Difficulty } from '@/lib/sheets'
import { TopicIcon, TopicBgSymbol } from '@/components/topic-icon'

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

export default function SheetCard({ unit, title, level, topic, difficulty, downloadUrl }: SheetCardProps) {
  const unitLabel = unit.toString().padStart(2, '0')

  return (
    <div className="border border-rule bg-white flex flex-col hover:border-ink hover:-translate-y-0.5 transition-all duration-200">

      {/* Card header */}
      <div className="relative flex items-center justify-center h-32 overflow-hidden" style={{ backgroundColor: '#EEEBE6' }}>
        <span
          className="absolute bottom-0 right-2 font-mono text-[72px] leading-none text-ink select-none pointer-events-none"
          style={{ opacity: 0.07 }}
          aria-hidden
        >
          <TopicBgSymbol topic={topic} />
        </span>
        <div className="absolute top-3 left-3 w-7 h-7 opacity-30">
          <TopicIcon topic={topic} className="w-full h-full" />
        </div>
        <span className="font-mono font-bold text-[46px] leading-none text-ink relative z-10">
          {unitLabel}
        </span>
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
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-3 py-2.5 text-center hover:bg-ink hover:text-paper transition-colors"
        >
          Download PDF
        </a>
      </div>
    </div>
  )
}
