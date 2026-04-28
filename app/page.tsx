import Link from 'next/link'

const features = [
  {
    href: '/papers',
    label: '01',
    title: 'Past Papers',
    desc: 'ข้อสอบเก่า SAT · สอวน. · พสวท. ฟรี',
  },
  {
    href: '/sheets',
    label: '02',
    title: 'Free Sheets',
    desc: 'แบบฝึกหัด 15 หน่วย ตามหลักสูตรสอวน.',
  },
  {
    href: '/videos',
    label: '03',
    title: 'Videos',
    desc: 'คลิปวิดีโอเฉลย และเทคนิคการคิด',
  },
]

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20 md:py-32">
          <h1 className="text-[40px] md:text-[72px] leading-none font-bold uppercase tracking-tight text-ink">
            Point of Math
          </h1>
          <div className="mt-6 h-px w-full bg-ink" />
          <p className="mt-6 text-[14px] md:text-[16px] tracking-wide text-muted">
            ข้อสอบเก่า · แบบฝึกหัด · คลิปวิดีโอ
          </p>
        </div>
      </section>

      {/* Features */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group bg-paper p-8 md:p-10 flex flex-col gap-6 min-h-[260px] hover:bg-white transition-colors"
              >
                <div className="text-[11px] uppercase tracking-widest text-muted">
                  {f.label}
                </div>
                <h2 className="text-[24px] md:text-[28px] font-medium text-ink group-hover:underline underline-offset-4 decoration-1">
                  {f.title}
                </h2>
                <p className="text-[13px] leading-relaxed text-muted mt-auto">
                  {f.desc}
                </p>
                <div className="text-[11px] uppercase tracking-widest text-ink mt-2">
                  → View
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tagline strip */}
      <section className="border-t border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted">
              Mission
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink">
              เปิดประตูสู่คณิตศาสตร์ระดับแข่งขัน สำหรับนักเรียนไทยทุกคน ฟรี.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted">
              Coverage
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink">
              SAT · สอวน. · PAT1 · AMC · พสวท.
            </p>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted">
              Free Forever
            </div>
            <p className="mt-3 text-[14px] leading-relaxed text-ink">
              ดาวน์โหลดได้ทุกอย่าง ไม่มีค่าใช้จ่าย ไม่มีโฆษณา.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
