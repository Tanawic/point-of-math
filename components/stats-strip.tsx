const stats = [
  { value: '9',    label: 'ชุดข้อสอบ',    sub: 'Past Papers'  },
  { value: '15',   label: 'แบบฝึกหัด',    sub: 'Free Sheets'  },
  { value: '5',    label: 'การสอบ',        sub: 'Competitions' },
  { value: 'Free', label: 'ทั้งหมด',       sub: 'No Sign-up'  },
]

export default function StatsStrip() {
  return (
    <section className="border-b border-rule bg-ink">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.08]">
          {stats.map((s) => (
            <div key={s.label} className="py-10 px-6 md:px-10 flex flex-col gap-1.5">
              <div className="font-mono font-bold text-[44px] md:text-[56px] leading-none text-paper tracking-tight">
                {s.value}
              </div>
              <div className="font-sans text-[14px] text-white/70 leading-snug">{s.label}</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-white/30 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
