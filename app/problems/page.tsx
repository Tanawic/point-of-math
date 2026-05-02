import type { Metadata } from 'next'
import ProblemsClient from '@/components/problems-client'
import { ALL_COMPETITIONS } from '@/lib/competitions'

export const metadata: Metadata = {
  title: 'Competition Problems',
  description:
    'รวมลิงก์ข้อสอบแข่งขันคณิตศาสตร์ทั่วโลก 30+ รายการ — IMO AMC AIME APMO IWYMIC TIMO HKIMO IMAS SASMO SEAMO JBMO สอวน. PAT1 KVIS ค้นหาตามระดับและภูมิภาค',
  openGraph: {
    title: 'Competition Problems · Point of Math',
    description: 'ข้อสอบแข่งขันคณิตศาสตร์ 30+ รายการ ค้นหาตามระดับ Junior/Senior/Olympiad และภูมิภาค',
  },
}

export default function ProblemsPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b border-rule relative overflow-hidden">
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 font-mono text-[180px] leading-none text-ink pointer-events-none select-none hidden md:block"
          style={{ opacity: 0.03 }}
          aria-hidden
        >
          ∫
        </div>
        <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-16">
          <div className="font-mono text-[11px] uppercase tracking-widest text-muted">
            Section · Competition Problems
          </div>
          <h1 className="mt-4 font-serif italic text-[48px] md:text-[72px] leading-[0.95] text-ink">
            Problems
          </h1>
          <div className="mt-8 h-px w-full bg-ink" />
          <p className="mt-6 font-sans text-[15px] text-muted leading-relaxed max-w-xl">
            รวมลิงก์ข้อสอบแข่งขันคณิตศาสตร์จากทั่วโลก{' '}
            <strong className="text-ink">{ALL_COMPETITIONS.length} รายการ</strong>
            {' '}— ค้นหาตามชื่อ กรองตามระดับชั้นและภูมิภาค คลิกเพื่อไปยังข้อสอบจริง
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex flex-wrap gap-6">
            {[
              { v: 'Primary / Junior', d: 'ม.ต้นลงมา' },
              { v: 'Senior / Olympiad', d: 'ม.ปลาย–ทีมชาติ' },
              { v: 'AoPS Solutions', d: 'มีลิงก์เฉลย' },
            ].map((s) => (
              <div key={s.v} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-ink" />
                <span className="font-mono text-[11px] text-ink">{s.v}</span>
                <span className="font-mono text-[11px] text-muted">· {s.d}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* School Open callout */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 pt-8 pb-0">
        <div className="border border-dashed border-ink p-6 flex flex-col md:flex-row md:items-start gap-6">
          <div className="flex-1">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
              School Open Competitions · การแข่งขันเปิดของโรงเรียน
            </div>
            <p className="font-sans text-[14px] text-ink leading-relaxed max-w-2xl">
              นอกจากการแข่งขันระดับชาติ–นานาชาติแล้ว{' '}
              <strong>หลายโรงเรียนยังจัดการแข่งขันเปิด</strong>{' '}
              ที่รับนักเรียนจากทุกสถาบัน — เหมาะสำหรับสะสมประสบการณ์และเตรียมความพร้อมก่อนแข่งระดับสูง
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'MWIT Open',
                'เบญจมมหาราช',
                'ร้อยเอ็ดวิทยาลัย',
                'สวนกุหลาบ',
                'สาธิตจุฬาฯ',
                'เตรียมอุดม',
              ].map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] uppercase tracking-widest border border-ink text-ink px-2 py-1"
                >
                  {s}
                </span>
              ))}
              <span className="font-mono text-[10px] text-muted px-2 py-1">+ อีกมาก</span>
            </div>
          </div>
          <div className="shrink-0 self-center md:self-start border border-rule px-5 py-3 text-center">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted">วิธีค้นหา</div>
            <div className="font-mono text-[12px] text-ink mt-1">
              ภูมิภาค → <strong>School Open</strong>
            </div>
            <div className="font-mono text-[9px] text-muted mt-1">ในตัวกรองด้านล่าง</div>
          </div>
        </div>
      </section>

      {/* Interactive search section */}
      <section className="mx-auto max-w-6xl px-6 md:px-10 py-10">
        <ProblemsClient />
      </section>
    </div>
  )
}
