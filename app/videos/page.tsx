import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos · Point of Math',
  description: 'คลิปวิดีโอคณิตศาสตร์จาก Point of Math YouTube channel',
}

const upcoming = [
  { topic: 'Number Theory',  title: 'Modular Arithmetic ฉบับสอวน.',    desc: 'เทคนิคลัดหาเศษ · Fermat · CRT'       },
  { topic: 'Algebra',        title: 'Polynomial ระดับโอลิมปิก',         desc: 'Factor Theorem · Vieta · Symmetric' },
  { topic: 'Geometry',       title: 'Euclidean Geometry Classic',       desc: 'Circle Theorems · Power of a Point' },
  { topic: 'Combinatorics',  title: 'การนับ & ความน่าจะเป็น',           desc: 'Pigeonhole · Inclusion-Exclusion'    },
  { topic: 'Logic',          title: 'เทคนิคการพิสูจน์',                 desc: 'Induction · Contradiction · Extremal' },
  { topic: 'SAT',            title: 'เฉลย SAT Math ครบทุก Test',        desc: 'Test 4 – 11 · เทคนิค + ที่ผิดบ่อย' },
]

export default function VideosPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule relative overflow-hidden">
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          ○
        </div>
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Section · Videos</div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Videos
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            คลิปวิดีโออธิบายโจทย์ เทคนิค และแนวคิด — กำลังจะมาในช่วงปิดเทอม.
          </p>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <div className="border border-ink p-10 md:p-16 grid md:grid-cols-[1fr_auto] gap-10 items-center">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-widest text-muted">YouTube Channel</div>
              <h2 className="mt-4 font-serif italic text-[32px] md:text-[48px] leading-tight text-ink">
                ติดตามก่อน<br />ไม่พลาด
              </h2>
              <p className="mt-5 font-sans text-[15px] text-muted leading-relaxed max-w-md">
                กด Subscribe เพื่อรับแจ้งเตือนเมื่อมีคลิปใหม่
                ทุกคลิปฟรี ครอบคลุม SAT · สอวน. · AMC
              </p>
            </div>
            <div className="flex flex-col gap-3 shrink-0">
              <a
                href="https://www.youtube.com/@PointOfMath"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[12px] uppercase tracking-widest bg-ink text-paper px-8 py-4 text-center hover:bg-muted transition-colors"
              >
                Subscribe →
              </a>
              <span className="font-mono text-[10px] text-muted text-center">Coming soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming topics */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="mb-10">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Upcoming</div>
            <h2 className="mt-3 font-serif italic text-[28px] md:text-[36px] leading-tight text-ink">
              คลิปที่กำลังจะมา
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-rule border border-rule">
            {upcoming.map((v) => (
              <div key={v.title} className="bg-paper p-6 flex flex-col gap-4 hover:bg-white transition-colors">
                {/* Video placeholder */}
                <div
                  className="aspect-video flex flex-col items-center justify-center border border-rule gap-2"
                  style={{ backgroundColor: '#EEEBE6' }}
                >
                  <span className="font-mono text-[32px] text-muted" aria-hidden>▷</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted">Coming Soon</span>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]">
                    {v.topic}
                  </span>
                </div>
                <div>
                  <h3 className="font-sans text-[14px] font-medium text-ink">{v.title}</h3>
                  <p className="mt-1 font-sans text-[12px] text-muted leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
