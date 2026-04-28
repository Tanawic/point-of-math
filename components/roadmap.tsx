import Link from 'next/link'

const levels = [
  {
    num:       '01',
    label:     'Beginner',
    nameEn:    'College Entrance',
    exams:     ['SAT Math'],
    status:    'มีข้อสอบ 8 ชุด',
    available: true,
  },
  {
    num:       '02',
    label:     'National',
    nameEn:    'Thai Entrance',
    exams:     ['PAT1', 'A-Level Math'],
    status:    'กำลังจัดทำ',
    available: false,
  },
  {
    num:       '03',
    label:     'Olympiad',
    nameEn:    'POSN Selection',
    exams:     ['สอวน. ค่าย 1', 'สอวน. ค่าย 2'],
    status:    'มีข้อสอบ + แบบฝึกหัด',
    available: true,
  },
  {
    num:       '04',
    label:     'International',
    nameEn:    'World Stage',
    exams:     ['AMC 10 / 12', 'USAMO', 'IMO'],
    status:    'กำลังจัดทำ',
    available: false,
  },
]

export default function Roadmap() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">

        {/* Header */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-end mb-14">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">Learning Path</div>
            <h2 className="mt-3 font-serif italic text-[36px] md:text-[48px] leading-tight text-ink">
              เส้นทาง<br />สู่โอลิมปิก
            </h2>
          </div>
          <p className="font-sans text-[14px] text-muted leading-relaxed max-w-md self-end">
            เริ่มจากระดับที่เหมาะกับคุณ ขยับขึ้นทีละ level
            ทุก level มีข้อสอบและแบบฝึกหัดรองรับ
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div className="hidden md:block absolute top-5 left-5 right-5 h-px bg-rule" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {levels.map((lvl) => (
              <div key={lvl.num} className="relative flex flex-col">

                {/* Node square */}
                <div className={`relative z-10 w-10 h-10 flex items-center justify-center mb-6 border transition-colors ${
                  lvl.available
                    ? 'bg-ink border-ink'
                    : 'bg-paper border-rule'
                }`}>
                  <span className={`font-mono text-[12px] font-bold ${lvl.available ? 'text-paper' : 'text-muted'}`}>
                    {lvl.num}
                  </span>
                </div>

                {/* Level label */}
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted">{lvl.label}</div>

                {/* Name */}
                <div className={`mt-1 font-sans text-[18px] font-semibold leading-tight ${lvl.available ? 'text-ink' : 'text-muted'}`}>
                  {lvl.nameEn}
                </div>

                {/* Exams list */}
                <div className="mt-4 flex flex-col gap-2">
                  {lvl.exams.map((e) => (
                    <div
                      key={e}
                      className={`font-sans text-[13px] border-l-2 pl-3 ${
                        lvl.available ? 'border-ink text-ink' : 'border-rule text-muted'
                      }`}
                    >
                      {e}
                    </div>
                  ))}
                </div>

                {/* Status badge */}
                <div className={`mt-5 font-mono text-[10px] uppercase tracking-widest px-2 py-1 self-start ${
                  lvl.available
                    ? 'bg-ink text-paper'
                    : 'border border-rule text-muted'
                }`}>
                  {lvl.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href="/papers"
            className="font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-5 py-2.5 hover:bg-ink hover:text-paper transition-colors"
          >
            ดูข้อสอบทั้งหมด →
          </Link>
        </div>
      </div>
    </section>
  )
}
