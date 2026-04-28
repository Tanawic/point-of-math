import type { Difficulty } from '@/lib/papers'

interface PaperCardProps {
  title: string
  competition: string
  year?: string
  difficulty: Difficulty
  downloadUrl: string
  answersUrl?: string
}

const difficultyStyle: Record<Difficulty, string> = {
  Medium:   'border border-rule text-muted',
  Hard:     'border border-ink text-ink',
  Olympiad: 'bg-ink text-paper',
}

export default function PaperCard({ title, competition, year, difficulty, downloadUrl, answersUrl }: PaperCardProps) {
  return (
    <div className="border-l-2 border-ink bg-white pl-5 pr-4 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:bg-paper transition-colors">

      {/* Left: info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-sans text-[15px] font-medium text-ink leading-snug">{title}</h3>
        <div className="mt-2.5 flex items-center flex-wrap gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest border border-rule text-muted px-2 py-[2px]">
            {competition}
          </span>
          {year && (
            <span className="font-mono text-[10px] uppercase tracking-widest border border-rule text-muted px-2 py-[2px]">
              {year}
            </span>
          )}
          <span className={`font-mono text-[10px] uppercase tracking-widest px-2 py-[2px] ${difficultyStyle[difficulty]}`}>
            {difficulty}
          </span>
        </div>
      </div>

      {/* Right: buttons */}
      <div className="flex items-center gap-2 shrink-0">
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-5 py-2 hover:bg-ink hover:text-paper transition-colors"
        >
          Download
        </a>
        {answersUrl && (
          <a
            href={answersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] uppercase tracking-widest border border-rule text-muted px-5 py-2 hover:border-ink hover:text-ink transition-colors"
          >
            Answers
          </a>
        )}
      </div>
    </div>
  )
}
