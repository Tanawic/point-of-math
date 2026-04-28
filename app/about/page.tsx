import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About · Point of Math',
  description: 'เกี่ยวกับ Point of Math',
}

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="text-[11px] uppercase tracking-widest text-muted">
            Section · About
          </div>
          <h1 className="mt-4 text-[36px] md:text-[56px] leading-none font-bold uppercase tracking-tight text-ink">
            About
          </h1>
          <div className="mt-6 h-px w-full bg-ink" />
        </div>
      </section>

      {/* Content */}
      <section>
        <div className="mx-auto max-w-3xl px-6 md:px-10 py-16 flex flex-col gap-10">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted">
              Mission
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-ink">
              Point of Math
              คือแหล่งรวมสื่อการเรียนคณิตศาสตร์
              สำหรับนักเรียนที่ต้องการเตรียมตัวสอบแข่งขัน
              ตั้งแต่ระดับ SAT ไปจนถึงโอลิมปิก.
            </p>
          </div>

          <div className="border-t border-rule pt-10">
            <div className="text-[11px] uppercase tracking-widest text-muted">
              What We Provide
            </div>
            <ul className="mt-4 flex flex-col gap-3 text-[14px] leading-relaxed text-ink">
              <li className="border-l-2 border-ink pl-4">
                ข้อสอบเก่า SAT, สอวน., PAT1, AMC, พสวท. พร้อมเฉลย
              </li>
              <li className="border-l-2 border-ink pl-4">
                แบบฝึกหัด 15 หน่วย ตามหลักสูตรค่ายสอวน.
              </li>
              <li className="border-l-2 border-ink pl-4">
                คลิปวิดีโอเฉลย และเทคนิคการคิดแบบโอลิมปิก
              </li>
            </ul>
          </div>

          <div className="border-t border-rule pt-10">
            <div className="text-[11px] uppercase tracking-widest text-muted">
              Contact
            </div>
            <p className="mt-4 text-[15px] text-ink">
              <a
                href="mailto:05351@pccm.ac.th"
                className="hover:underline underline-offset-4"
              >
                05351@pccm.ac.th
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
