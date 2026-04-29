import type { Metadata } from 'next'
import Link from 'next/link'
import GeoGraphic from '@/components/geo-graphic'
import StatsStrip from '@/components/stats-strip'
import Roadmap from '@/components/roadmap'
import FAQ from '@/components/faq'
import ScrollReveal from '@/components/scroll-reveal'
import BuyButton from '@/components/buy-button'
import { COURSES } from '@/lib/courses'

export const metadata: Metadata = {
  title: 'Point of Math — ข้อสอบ สอวน. SAT AMC KVIS ฟรี',
  description:
    'แบบฝึกหัดโอลิมปิก 15 หน่วย + ข้อสอบเก่า สอวน. SAT PAT1 AMC ดาวน์โหลดฟรี ไม่ต้องสมัคร ไม่มีโฆษณา',
  openGraph: {
    title: 'Point of Math — ข้อสอบ สอวน. SAT AMC KVIS ฟรี',
    description: 'แบบฝึกหัดโอลิมปิก 15 หน่วย + ข้อสอบเก่า สอวน. SAT ดาวน์โหลดฟรี',
  },
}

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

const testimonials = [
  {
    quote: 'ชีท 15 หน่วยละเอียดมากครับ — ช่วยให้ผมเข้าค่าย 1 สอวน. ได้ปีนี้',
    name: 'ภูมิ ว.',
    meta: 'สอวน. คณิตศาสตร์ ค่าย 1 · ม.5',
  },
  {
    quote: 'ข้อสอบ SAT เก่าพร้อมเฉลยครบทุกชุด หาที่อื่นไม่ได้แบบนี้',
    name: 'มินท์ ส.',
    meta: 'SAT Math 760 · ม.6',
  },
  {
    quote: 'ฟรีจริง ไม่มีโฆษณา ไม่ต้องสมัคร — ใช้เตรียม KVIS ได้เลย',
    name: 'ต้น ร.',
    meta: 'KVIS รอบ 1 ผ่าน · ม.2',
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
              เตรียมสอบ สอวน. · SAT · KVIS · AMC
              <br />
              <span className="text-ink font-medium">แบบฝึกหัด 15 หน่วย + ข้อสอบเก่า — ฟรี ไม่ต้องสมัคร ไม่มีโฆษณา</span>
            </p>
            <div className="hero-ctas mt-10 flex flex-wrap gap-3">
              <Link
                href="/sheets"
                className="font-mono text-[12px] uppercase tracking-widest bg-ink text-paper px-8 py-3.5 hover:bg-muted transition-colors"
              >
                ดาวน์โหลดชีทฟรี →
              </Link>
              <Link
                href="/courses"
                className="font-mono text-[12px] uppercase tracking-widest border border-ink text-ink px-8 py-3.5 hover:bg-ink hover:text-paper transition-colors"
              >
                ดูคอร์สเรียน
              </Link>
            </div>
            <p className="mt-5 font-mono text-[11px] text-muted/70">
              ดาวน์โหลดแล้วกว่า 3,500 ครั้ง · ไม่ต้องสมัครสมาชิก
            </p>
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

      {/* ─── TESTIMONIALS ─────────────────────────────── */}
      <section className="border-b border-rule">
        <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
          <ScrollReveal>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted mb-10">
              นักเรียนพูดถึง Point of Math
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-rule border border-rule">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-paper p-8 flex flex-col gap-5">
                  <p className="font-sans text-[15px] leading-relaxed text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-auto">
                    <div className="h-px w-8 bg-rule mb-4" />
                    <p className="font-sans text-[13px] font-medium text-ink">{t.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted mt-1">{t.meta}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
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
                    <span className="text-paper font-bold">{featuredCourse.priceDisplay} ฿</span>
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <BuyButton courseId={featuredCourse.id} courseTitle={featuredCourse.title} priceDisplay={featuredCourse.priceDisplay} includes={featuredCourse.includes} label="ซื้อเลย →" />
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
