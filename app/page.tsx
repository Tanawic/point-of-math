import Link from 'next/link'
import GeoGraphic from '@/components/geo-graphic'
import StatsStrip from '@/components/stats-strip'
import Roadmap from '@/components/roadmap'
import FAQ from '@/components/faq'
import ScrollReveal from '@/components/scroll-reveal'
import BuyButton from '@/components/buy-button'
import { COURSES } from '@/lib/courses'

const features = [
  {
    href:  '/papers',
    num:   '01',
    title: 'Past Papers',
    thai:  'ข้อสอบเก่า',
    desc:  'SAT · สอวน. · PAT1 · AMC · พสวท. พร้อมเฉลย',
    icon:  '□',
  },
  {
    href:  '/sheets',
    num:   '02',
    title: 'Free Sheets',
    thai:  'แบบฝึกหัด',
    desc:  '15 หน่วย ครอบคลุม 5 สาขา ตามหลักสูตรสอวน.',
    icon:  '△',
  },
  {
    href:  '/videos',
    num:   '03',
    title: 'Videos',
    thai:  'คลิปวิดีโอ',
    desc:  'เฉลยและเทคนิค — กำลังจะมาเร็วๆ นี้',
    icon:  '○',
  },
]

export default function HomePage() {
  const featuredCourse = COURSES[0]

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────── */}
      <section className="border-b border-rule relative overflow-hidden min-h-[90vh] flex items-center">

        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dot-grid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="16" cy="16" r="1" fill="#0A0A0A" opacity="0.07" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dot-grid)" />
          </svg>
        </div>

        <div className="hero-graphic absolute top-0 right-0 w-[48%] h-full hidden md:flex items-center justify-end pr-6 pointer-events-none" aria-hidden>
          <GeoGraphic className="w-full max-w-[480px] opacity-30" />
        </div>

        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-28 md:py-40 w-full">
          <div className="max-w-[560px]">
            <div className="hero-eyebrow font-mono text-[11px] uppercase tracking-widest text-muted mb-8">
              Mathematical Resources · Thailand
            </div>
            <h1 className="hero-title font-serif italic text-[64px] md:text-[96px] leading-[0.9] text-ink">
              Point<br />of Math
            </h1>
            <div className="hero-rule mt-10 h-px bg-ink" />
            <p className="hero-sub mt-8 font-sans text-[16px] leading-relaxed text-muted">
              ข้อสอบแข่งขัน · แบบฝึกหัดโอลิมปิก · คลิปวิดีโอ
              <br />
              <span className="text-ink font-medium">ฟรีทั้งหมด ไม่ต้องสมัคร ไม่มีโฆษณา</span>
            </p>
            <div className="hero-ctas mt-10 flex flex-wrap gap-3">
              <Link
                href="/papers"
                className="font-mono text-[12px] uppercase tracking-widest bg-ink text-paper px-8 py-3.5 hover:bg-muted transition-colors"
              >
                ดูข้อสอบ →
              </Link>
              <Link
                href="/courses"
                className="font-mono text-[12px] uppercase tracking-widest border border-ink text-ink px-8 py-3.5 hover:bg-ink hover:text-paper transition-colors"
              >
                คอร์สเรียน
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── STATS ────────────────────────────────────── */}
      <StatsStrip />

      {/* ─── FEATURES ─────────────────────────────────── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
            {features.map((f, i) => (
              <ScrollReveal key={f.href} delay={i * 100}>
                <Link
                  href={f.href}
                  className="group bg-paper p-8 md:p-10 flex flex-col gap-5 min-h-[280px] hover:bg-white transition-colors relative overflow-hidden"
                >
                  <span
                    className="absolute bottom-4 right-6 font-mono text-[72px] leading-none text-ink select-none pointer-events-none transition-transform duration-300 group-hover:scale-110"
                    style={{ opacity: 0.05 }}
                    aria-hidden
                  >
                    {f.icon}
                  </span>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-muted">{f.num}</div>
                  <div>
                    <h2 className="font-serif italic text-[32px] md:text-[36px] leading-tight text-ink">
                      {f.title}
                    </h2>
                    <div className="font-sans text-[14px] text-muted mt-1">{f.thai}</div>
                  </div>
                  <p className="font-sans text-[13px] leading-relaxed text-muted mt-auto relative z-10">
                    {f.desc}
                  </p>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-ink group-hover:underline underline-offset-4">
                    → View
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COURSE TEASER ────────────────────────────── */}
      {featuredCourse && (
        <section className="border-b border-rule bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
            <ScrollReveal>
              <div className="grid md:grid-cols-[1fr_auto] gap-12 items-center">
                <div>
                  <div className="font-mono text-[11px] uppercase tracking-widest text-paper/40 mb-4">
                    Featured Course
                  </div>
                  <h2 className="font-serif italic text-[36px] md:text-[52px] leading-tight text-paper">
                    {featuredCourse.title}
                  </h2>
                  <p className="mt-5 font-sans text-[15px] text-paper/60 leading-relaxed max-w-lg">
                    {featuredCourse.tagline}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-6 font-mono text-[12px] text-paper/50">
                    <span>{featuredCourse.level}</span>
                    <span>·</span>
                    <span>{featuredCourse.duration}</span>
                    <span>·</span>
                    <span className="text-paper font-bold">{featuredCourse.priceDisplay}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <BuyButton courseId={featuredCourse.id} courseTitle={featuredCourse.title} priceDisplay={featuredCourse.priceDisplay} label="ซื้อเลย →" />
                  <Link
                    href="/courses"
                    className="font-mono text-[11px] uppercase tracking-widest text-paper/50 text-center hover:text-paper transition-colors"
                  >
                    ดูรายละเอียดคอร์ส
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─── ROADMAP ──────────────────────────────────── */}
      <Roadmap />

      {/* ─── FAQ ──────────────────────────────────────── */}
      <FAQ />
    </div>
  )
}
