import type { Metadata } from 'next'
import { COURSES } from '@/lib/courses'
import BuyButton from '@/components/buy-button'
import ScrollReveal from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Courses · Point of Math',
  description: 'คอร์สคณิตศาสตร์โอลิมปิก เตรียมสอบสอวน. PAT1 และ AMC',
}

const CHECKMARK = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
    <circle cx="8" cy="8" r="8" fill="#0A0A0A" />
    <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#F8F5F0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export default function CoursesPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule relative overflow-hidden">
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          ∑
        </div>
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Section · Courses</div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Courses
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            คอร์สเชิงลึกสำหรับนักเรียนที่ต้องการก้าวข้ามระดับ
            จากแบบฝึกหัดธรรมดาสู่โอลิมปิกและสอวน.
          </p>
        </div>
      </section>

      {/* Course cards */}
      <section>
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-16 flex flex-col gap-16">
          {COURSES.map((course, i) => (
            <ScrollReveal key={course.id} delay={i * 80}>
              <div className="border border-rule grid md:grid-cols-[1fr_340px]">

                {/* Left — course info */}
                <div className="p-8 md:p-12 flex flex-col gap-8 border-b md:border-b-0 md:border-r border-rule">

                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                      {course.level} · {course.duration}
                    </div>
                    <h2 className="font-serif italic text-[32px] md:text-[40px] leading-tight text-ink">
                      {course.title}
                    </h2>
                    <p className="mt-4 font-sans text-[15px] text-muted leading-relaxed max-w-lg">
                      {course.tagline}
                    </p>
                  </div>

                  {/* Topics */}
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                      หัวข้อที่ครอบคลุม
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {course.topics.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[11px] text-muted border border-rule px-3 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Includes */}
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                      สิ่งที่รวมอยู่
                    </div>
                    <ul className="flex flex-col gap-2.5">
                      {course.includes.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          {CHECKMARK}
                          <span className="font-sans text-[14px] text-ink leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right — price + buy */}
                <div className="p-8 md:p-12 flex flex-col justify-between gap-8 bg-paper">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                      ราคา
                    </div>
                    <div className="flex items-end gap-1.5 leading-none">
                      <span className="font-mono text-[52px] font-bold text-ink">{course.priceDisplay}</span>
                      <span className="font-sans font-medium text-[20px] text-ink/60 pb-1.5">฿</span>
                    </div>
                    <p className="mt-3 font-sans text-[13px] text-muted leading-relaxed">
                      จ่ายครั้งเดียว · เข้าถึงตลอดชีพ<br />
                      บัตรเครดิต / PromptPay
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <BuyButton
                      courseId={course.id}
                      courseTitle={course.title}
                      priceDisplay={course.priceDisplay}
                      includes={course.includes}
                      label="ซื้อเลย →"
                    />
                    <p className="font-mono text-[10px] text-muted text-center">
                      ได้รับลิงก์ทันทีทางอีเมล
                    </p>
                  </div>

                  {/* Guarantee */}
                  <div className="border-t border-rule pt-6">
                    <p className="font-sans text-[13px] text-muted leading-relaxed">
                      ไม่พอใจภายใน 7 วัน — คืนเงินเต็มจำนวน ไม่มีคำถาม
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  )
}
