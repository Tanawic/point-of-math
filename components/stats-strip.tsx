const stats = [
  { value: '9',   label: 'ชุดข้อสอบ' },
  { value: '15',  label: 'แบบฝึกหัด' },
  { value: '5',   label: 'การสอบ' },
  { value: 'Free', label: 'ทั้งหมด' },
]

export default function StatsStrip() {
  return (
    <section className="border-b border-rule bg-ink">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((s) => (
            <div key={s.label} className="py-8 px-6 flex flex-col gap-1">
              <div className="text-[32px] md:text-[40px] font-bold leading-none text-paper tracking-tight">
                {s.value}
              </div>
              <div className="text-[11px] uppercase tracking-widest text-white/50">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
