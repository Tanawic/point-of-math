import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos · Point of Math',
  description: 'คลิปวิดีโอคณิตศาสตร์จาก Point of Math',
}

const placeholders = Array.from({ length: 8 }, (_, i) => i + 1)

export default function VideosPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="text-[11px] uppercase tracking-widest text-muted">
            Section · Videos
          </div>
          <h1 className="mt-4 text-[36px] md:text-[56px] leading-none font-bold uppercase tracking-tight text-ink">
            Videos
          </h1>
          <div className="mt-6 h-px w-full bg-ink" />
          <p className="mt-6 text-[14px] tracking-wide text-muted max-w-2xl">
            คลิปวิดีโอจาก YouTube กำลังจะมาเร็วๆ นี้.
          </p>
          <div className="mt-6">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-[11px] uppercase tracking-widest border border-ink text-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
            >
              YouTube Channel
            </a>
          </div>
        </div>
      </section>

      {/* Coming-soon grid */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {placeholders.map((n) => (
              <div
                key={n}
                className="border border-rule bg-white flex flex-col"
              >
                <div
                  className="aspect-video flex items-center justify-center text-[11px] uppercase tracking-widest text-muted"
                  style={{ backgroundColor: '#EAEAEA' }}
                >
                  Coming Soon
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-3 w-3/4 bg-rule" />
                  <div className="h-3 w-1/2 bg-rule" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
