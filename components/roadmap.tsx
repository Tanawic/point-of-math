import Link from 'next/link'

const levels = [
  {
    num: '01',
    label: 'Beginner',
    nameEn: 'College Entrance',
    exams: ['SAT Math'],
    status: 'มีข้อสอบ 8 ชุด',
    available: true,
    href: '/papers',
  },
  {
    num: '02',
    label: 'National',
    nameEn: 'Thai Entrance',
    exams: ['PAT1', 'A-Level Math'],
    status: 'กำลังจัดทำ',
    available: false,
    href: '/papers',
  },
  {
    num: '03',
    label: 'Olympiad',
    nameEn: 'POSN Selection',
    exams: ['สอวน. ค่าย 1', 'สอวน. ค่าย 2'],
    status: 'มีข้อสอบ + แบบฝึกหัด',
    available: true,
    href: '/papers',
  },
  {
    num: '04',
    label: 'International',
    nameEn: 'World Stage',
    exams: ['AMC 10 / 12', 'USAMO', 'IMO'],
    status: 'กำลังจัดทำ',
    available: false,
    href: '/papers',
  },
]

export default function Roadmap() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <div className="mb-12">
          <div className="text-[11px] uppercase tracking-widest text-muted">Learning Path</div>
          <h2 className="mt-4 text-[28px] md:text-[36px] font-bold leading-tight text-ink uppercase tracking-tight">
            เส้นทางสู่<br className="md:hidden" />โอลิมปิก
          </h2>
          <p className="mt-4 text-[14px] text-muted max-w-lg">
            เริ่มจากระดับที่เหมาะกับคุณ ขยับขึ้นไปเรื่อยๆ ทุก level มีข้อสอบและแบบฝึกหัดรองรับ
          </p>
        </div>

        {/* Desktop: horizontal row | Mobile: vertical stack */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-rule border border-rule">
          {levels.map((lvl) => (
            <div
              key={lvl.num}
              className={`bg-paper p-6 flex flex-col gap-4 relative ${
                lvl.available ? '' : 'opacity-50'
              }`}
            >
              {/* Connector arrow — desktop only */}
              <div className="hidden md:block absolute -right-px top-1/2 -translate-y-1/2 w-px h-8 bg-rule z-10" />

              <div className="text-[11px] uppercase tracking-widest text-muted">{lvl.num}</div>

              <div>
                <div className="text-[20px] font-bold text-ink leading-none">{lvl.label}</div>
                <div className="text-[12px] text-muted mt-1">{lvl.nameEn}</div>
              </div>

              <div className="flex flex-col gap-1">
                {lvl.exams.map((e) => (
                  <div
                    key={e}
                    className="text-[13px] text-ink border-l border-ink pl-3"
                  >
                    {e}
                  </div>
                ))}
              </div>

              <div
                className={`text-[10px] uppercase tracking-widest mt-auto px-2 py-1 self-start ${
                  lvl.available
                    ? 'bg-ink text-paper'
                    : 'border border-rule text-muted'
                }`}
              >
                {lvl.status}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <Link
            href="/papers"
            className="text-[11px] uppercase tracking-widest text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-paper transition-colors"
          >
            ดูข้อสอบทั้งหมด →
          </Link>
        </div>
      </div>
    </section>
  )
}
