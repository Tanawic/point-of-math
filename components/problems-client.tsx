'use client'

import { useState, useMemo } from 'react'
import {
  ALL_COMPETITIONS, ALL_REGIONS, ALL_LEVELS, DIFFICULTY_LABEL,
  type Competition, type Level, type Region,
} from '@/lib/competitions'

// ─── Difficulty bar ──────────────────────────────────────────────────────────
function DiffBar({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-3 h-1.5 ${i <= n ? 'bg-ink' : 'bg-rule'}`} />
      ))}
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted ml-1.5">
        {DIFFICULTY_LABEL[n]}
      </span>
    </div>
  )
}

// ─── Competition card ────────────────────────────────────────────────────────
function CompCard({ c }: { c: Competition }) {
  return (
    <div className="border border-rule bg-white hover:border-ink hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
      {/* Top */}
      <div className="p-5 flex-1 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-sans text-[15px] font-semibold text-ink leading-tight">
                {c.name}
              </h3>
              {!c.hasPastPapers && (
                <span className="font-mono text-[9px] uppercase tracking-widest border border-rule text-muted px-1.5 py-0.5 shrink-0">
                  reg req.
                </span>
              )}
            </div>
            <p className="font-mono text-[11px] text-muted mt-0.5 leading-snug truncate">
              {c.fullName}
            </p>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-widest border border-rule text-muted px-2 py-1 shrink-0">
            {c.region}
          </span>
        </div>

        <p className="font-sans text-[13px] text-muted leading-relaxed flex-1">
          {c.description}
        </p>

        {/* Level pills */}
        <div className="flex flex-wrap gap-1.5">
          {c.levels.map((lv) => (
            <span
              key={lv}
              className="font-mono text-[10px] uppercase tracking-widest text-muted border border-rule px-2 py-[2px]"
            >
              {lv}
            </span>
          ))}
          {c.topics.slice(0, 3).map((t) => (
            <span
              key={t}
              className="font-mono text-[10px] uppercase tracking-widest text-muted/60 border border-rule/60 px-2 py-[2px]"
            >
              {t}
            </span>
          ))}
        </div>

        {c.note && (
          <p className="font-mono text-[10px] text-muted/70 italic">{c.note}</p>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-rule p-4 flex flex-col gap-3">
        <DiffBar n={c.difficulty} />
        <div className="flex items-center gap-2">
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-3 py-2.5 text-center hover:bg-muted transition-colors"
          >
            {c.hasPastPapers ? 'Past Papers →' : 'Official Site →'}
          </a>
          {c.solutionsUrl && c.solutionsUrl !== c.url && (
            <a
              href={c.solutionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              title="Solutions / AoPS"
              className="font-mono text-[11px] uppercase tracking-widest border border-rule text-muted px-3 py-2.5 hover:border-ink hover:text-ink transition-colors"
            >
              Solutions
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Filter pill button ──────────────────────────────────────────────────────
function Pill({
  label, active, onClick,
}: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[11px] uppercase tracking-widest px-3 py-2 border transition-colors ${
        active
          ? 'bg-ink text-paper border-ink'
          : 'border-rule text-muted hover:border-ink hover:text-ink'
      }`}
    >
      {label}
    </button>
  )
}

// ─── Main client component ───────────────────────────────────────────────────
export default function ProblemsClient() {
  const [query, setQuery]       = useState('')
  const [level, setLevel]       = useState<Level | 'All'>('All')
  const [region, setRegion]     = useState<Region | 'All'>('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return ALL_COMPETITIONS.filter((c) => {
      const matchQ =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.fullName.toLowerCase().includes(q) ||
        (c.nameThai ?? '').includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.topics.some((t) => t.toLowerCase().includes(q))

      const matchLevel =
        level === 'All' ||
        c.levels.includes(level as Level) ||
        c.levels.includes('All Levels')

      const matchRegion = region === 'All' || c.region === region

      return matchQ && matchLevel && matchRegion
    })
  }, [query, level, region])

  const clear = () => { setQuery(''); setLevel('All'); setRegion('All') }
  const dirty = query || level !== 'All' || region !== 'All'

  return (
    <div>
      {/* Search + filters */}
      <div className="sticky top-16 z-30 bg-paper border-b border-rule py-4 -mx-6 md:-mx-10 px-6 md:px-10">
        <div className="flex flex-col gap-3">
          {/* Search input */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[12px] text-muted pointer-events-none">
              ⌕
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ค้นหาการแข่งขัน... เช่น TIMO, Junior, Number Theory"
              className="w-full pl-9 pr-4 py-2.5 border border-rule bg-white font-sans text-[13px] text-ink placeholder:text-muted focus:outline-none focus:border-ink transition-colors"
            />
          </div>

          {/* Level filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted w-10">ระดับ</span>
            <Pill label="ทั้งหมด" active={level === 'All'} onClick={() => setLevel('All')} />
            {ALL_LEVELS.map((lv) => (
              <Pill key={lv} label={lv} active={level === lv} onClick={() => setLevel(lv)} />
            ))}
          </div>

          {/* Region filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted w-10">ภูมิภาค</span>
            <Pill label="ทั้งหมด" active={region === 'All'} onClick={() => setRegion('All')} />
            {ALL_REGIONS.map((r) => (
              <Pill key={r} label={r} active={region === r} onClick={() => setRegion(r as Region)} />
            ))}
          </div>

          {/* Result count + clear */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-muted">
              แสดง {filtered.length} จาก {ALL_COMPETITIONS.length} รายการ
            </span>
            {dirty && (
              <button
                onClick={clear}
                className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-ink transition-colors underline underline-offset-2"
              >
                ล้างตัวกรอง
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((c) => <CompCard key={c.id} c={c} />)}
      </div>

      {filtered.length === 0 && (
        <div className="mt-8 border border-dashed border-rule px-6 py-16 text-center">
          <p className="font-sans text-[13px] text-muted">ไม่พบการแข่งขันที่ตรงกับเงื่อนไข</p>
          <button onClick={clear} className="mt-3 font-mono text-[11px] uppercase tracking-widest text-ink underline underline-offset-2">
            ล้างตัวกรอง
          </button>
        </div>
      )}

      {/* Footer note */}
      <div className="mt-16 border-t border-rule pt-6">
        <p className="font-sans text-[13px] text-muted leading-relaxed max-w-2xl">
          ลิงก์ชี้ไปยังแหล่งข้อสอบทางการหรือ{' '}
          <a href="https://artofproblemsolving.com" target="_blank" rel="noopener noreferrer"
             className="text-ink underline underline-offset-2 hover:opacity-70">
            Art of Problem Solving
          </a>{' '}
          · "reg req." หมายถึงต้องสมัครผ่านผู้จัดหรือศูนย์ฝึก ·{' '}
          <a href="/sheets" className="text-ink underline underline-offset-2 hover:opacity-70">
            Free Sheets →
          </a>{' '}
          สำหรับแบบฝึกหัดเรียงหน่วยตามหลักสูตร สอวน.
        </p>
      </div>
    </div>
  )
}
