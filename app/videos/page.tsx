import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Videos · Point of Math',
  description: 'คลิปวิดีโอคณิตศาสตร์จาก Point of Math YouTube channel',
}

const upcoming = [
  {
    topic: 'Number Theory',
    title: 'Modular Arithmetic ฉบับสอวน.',
    desc: 'เทคนิคลัดหาเศษ · ทฤษฎีบท Fermat · Chinese Remainder',
  },
  {
    topic: 'Algebra',
    title: 'Polynomial ระดับโอลิมปิก',
    desc: 'Factor Theorem · Vieta · Symmetric Functions',
  },
  {
    topic: 'Geometry',
    title: 'Euclidean Geometry Classic',
    desc: 'Circle Theorems · Power of a Point · Radical Axis',
  },
  {
    topic: 'Combinatorics',
    title: 'การนับ & ความน่าจะเป็น',
    desc: 'Pigeonhole · Inclusion-Exclusion · Expected Value',
  },
  {
    topic: 'Logic',
    title: 'เทคนิคการพิสูจน์',
    desc: 'Induction · Contradiction · Extremal Principle',
  },
  {
    topic: 'SAT',
    title: 'เฉลย SAT Math ครบทุก Test',
    desc: 'Test 4 – 11 · เทคนิค + ที่ผิดบ่อย',
  },
]

export default function VideosPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="text-[11px] uppercase tracking-widest text-muted">Section · Videos</div>
          <h1 className="mt-4 text-[36px] md:text-[56px] leading-none font-bold uppercase tracking-tight text-ink">
            Videos
          </h1>
          <div className="mt-6 h-px w-full bg-ink" />
          <p className="mt-6 text-[14px] tracking-wide text-muted max-w-2xl">
            คลิปวิดีโออธิบายโจทย์ เทคนิค และแนวคิด กำลังจะมาในช่วงปิดเทอม.
          </p>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <div className="border border-ink p-10 md:p-16 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-muted">YouTube Channel</div>
              <h2 className="mt-3 text-[24px] md:text-[32px] font-bold text-ink leading-tight uppercase tracking-tight">
                ติดตามก่อน<br />ไม่พลาด
              </h2>
              <p className="mt-4 text-[14px] text-muted max-w-md leading-relaxed">
                กด Subscribe เพื่อรับแจ้งเตือนเมื่อมีคลิปใหม่
                ทุกคลิปฟรี ไม่มีค่าใช้จ่าย ครอบคลุม SAT · สอวน. · AMC
              </p>
            </div>
            <div className="shrink-0">
              <a
                href="https://www.youtube.com/@PointOfMath"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-[12px] uppercase tracking-widest bg-ink text-paper px-8 py-4 hover:bg-muted transition-colors"
              >
                Subscribe →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming topics */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="mb-10">
            <div className="text-[11px] uppercase tracking-widest text-muted">Upcoming</div>
            <h2 className="mt-3 text-[22px] font-bold text-ink uppercase tracking-tight">
              คลิปที่กำลังจะมา
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-rule border border-rule">
            {upcoming.map((v) => (
              <div key={v.title} className="bg-paper p-6 flex flex-col gap-4">
                <div
                  className="aspect-video flex items-center justify-center text-[11px] uppercase tracking-widest text-muted border border-rule"
                  style={{ backgroundColor: '#EAEAEA' }}
                >
                  Coming Soon
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]">
                    {v.topic}
                  </span>
                </div>
                <div>
                  <h3 className="text-[14px] font-medium text-ink">{v.title}</h3>
                  <p className="mt-1 text-[12px] text-muted leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
