import type { Metadata } from 'next'
import GeoGraphic from '@/components/geo-graphic'

export const metadata: Metadata = {
  title: 'About · Point of Math',
  description: 'เกี่ยวกับ Point of Math — แหล่งรวมสื่อคณิตศาสตร์แข่งขัน ฟรี',
}

const provides = [
  { icon: '□', text: 'ข้อสอบเก่า SAT, สอวน., PAT1, AMC, พสวท. พร้อมเฉลย' },
  { icon: '△', text: 'แบบฝึกหัด 15 หน่วย ตามหลักสูตรค่ายสอวน.' },
  { icon: '○', text: 'คลิปวิดีโอเฉลย และเทคนิคการคิดแบบโอลิมปิก' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Section · About</div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            About
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
        </div>
      </section>

      {/* Main content */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="grid md:grid-cols-[2fr_1fr] gap-16 md:gap-24 items-start">

            {/* Left: text blocks */}
            <div className="flex flex-col gap-14">

              <div>
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5">Mission</div>
                <p className="font-sans text-[16px] md:text-[18px] leading-[1.75] text-ink">
                  Point of Math คือแหล่งรวมสื่อการเรียนคณิตศาสตร์
                  สำหรับนักเรียนที่ต้องการเตรียมตัวสอบแข่งขัน
                  ตั้งแต่ระดับ SAT ไปจนถึงโอลิมปิก — ทั้งหมดฟรี
                  ไม่มีค่าใช้จ่าย ไม่ต้องสมัครสมาชิก.
                </p>
              </div>

              <div className="border-t border-rule pt-12">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted mb-6">What We Provide</div>
                <ul className="flex flex-col gap-4">
                  {provides.map((p) => (
                    <li key={p.text} className="flex items-start gap-4">
                      <span className="font-mono text-[18px] text-muted mt-0.5 shrink-0" aria-hidden>
                        {p.icon}
                      </span>
                      <span className="font-sans text-[15px] text-ink leading-relaxed">{p.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-rule pt-12">
                <div className="font-mono text-[11px] uppercase tracking-widest text-muted mb-5">Contact</div>
                <a
                  href="mailto:pointofmathcontacts@gmail.com"
                  className="font-sans text-[16px] text-ink hover:text-muted transition-colors underline underline-offset-4 decoration-rule hover:decoration-muted"
                >
                  pointofmathcontacts@gmail.com
                </a>
              </div>
            </div>

            {/* Right: decorative geometric figure */}
            <div className="hidden md:block sticky top-24">
              <GeoGraphic className="w-full opacity-40" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
