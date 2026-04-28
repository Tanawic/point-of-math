interface PaperCardProps {
  title: string
  competition: string
  year?: string
  downloadUrl: string
  answersUrl?: string
}

export default function PaperCard({
  title,
  competition,
  year,
  downloadUrl,
  answersUrl,
}: PaperCardProps) {
  return (
    <div className="border-l-2 border-ink bg-white pl-5 pr-4 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-l-[3px] transition-[border]">
      <div className="flex-1 min-w-0">
        <h3 className="text-[15px] font-medium text-ink leading-snug">
          {title}
        </h3>
        <div className="mt-2 flex items-center flex-wrap gap-2 text-[11px] uppercase tracking-widest text-muted">
          <span className="border border-rule px-2 py-[2px]">{competition}</span>
          {year && <span className="border border-rule px-2 py-[2px]">{year}</span>}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] uppercase tracking-widest border border-ink text-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
        >
          Download
        </a>
        {answersUrl && (
          <a
            href={answersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-widest border border-ink text-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            Answers
          </a>
        )}
      </div>
    </div>
  )
}
