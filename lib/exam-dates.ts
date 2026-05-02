export interface ExamEvent {
  id: string
  name: string
  nameFull?: string
  region: string
  /** Typical month (1-12) and day — used to compute next occurrence */
  month: number
  day: number
  note?: string
  url?: string
}

// Only open-registration competitions with confirmed annual windows.
// Dates reflect typical scheduling — verify exact date at organiser's site before registering.
export const EXAM_EVENTS: ExamEvent[] = [
  {
    id: 'soawn-r1',
    name: 'สอวน. รอบ 1',
    nameFull: 'สอวน. คณิตศาสตร์ รอบแรก',
    region: 'Thailand',
    month: 10, day: 15,
    note: 'ช่วงกลาง ต.ค. — ตรวจสอบวันจริงที่ posn.or.th',
    url: 'https://www.posn.or.th/th/competition/science/math',
  },
  {
    id: 'timo-heat',
    name: 'TIMO Heat',
    nameFull: 'Thailand International Mathematical Olympiad — Heat Round',
    region: 'Thailand',
    month: 11, day: 5,
    note: 'ช่วงต้น พ.ย. — ป.3 ถึง ม.6 — ตรวจสอบวันจริงที่ thaiimo.com',
    url: 'https://www.thaiimo.com',
  },
  {
    id: 'kvis',
    name: 'KVIS รอบ 1',
    nameFull: 'โรงเรียนกำเนิดวิทย์ — สอบคัดเลือกรอบแรก',
    region: 'Thailand',
    month: 2, day: 1,
    note: 'ช่วงต้น ก.พ. — ตรวจสอบวันจริงที่ kvis.ac.th',
    url: 'https://www.kvis.ac.th',
  },
  {
    id: 'pat1',
    name: 'PAT 1',
    nameFull: 'ความถนัดทางคณิตศาสตร์ (TCAS)',
    region: 'Thailand',
    month: 3, day: 22,
    note: 'ช่วงปลาย มี.ค. ตามกำหนด TCAS — ตรวจสอบที่ mytcas.com',
    url: 'https://www.mytcas.com',
  },
  {
    id: 'amc-1012',
    name: 'AMC 10/12',
    nameFull: 'American Mathematics Competition 10/12',
    region: 'USA',
    month: 11, day: 6,
    note: 'ต้น พ.ย. — สมัครผ่านโรงเรียนหรือ MAA ล่วงหน้า 1 เดือน',
    url: 'https://maa.org/math-competitions',
  },
  {
    id: 'hkimo-heat',
    name: 'HKIMO Heat',
    nameFull: 'Hong Kong International Mathematical Olympiad — Heat Round',
    region: 'Asia-Pacific',
    month: 12, day: 7,
    note: 'ช่วงต้น ธ.ค. — ตรวจสอบวันจริงที่ hkimo.com',
    url: 'https://www.hkimo.com',
  },
]

/** Returns the next calendar date (year auto-advances) for a given month/day */
export function nextOccurrence(month: number, day: number): Date {
  const now = new Date()
  const year = now.getFullYear()
  const candidate = new Date(year, month - 1, day)
  if (candidate <= now) candidate.setFullYear(year + 1)
  return candidate
}

/** Days until the event (ceil) */
export function daysUntil(target: Date): number {
  const ms = target.getTime() - Date.now()
  return Math.max(0, Math.ceil(ms / 86_400_000))
}

/** Sorted upcoming events */
export function upcomingExams(limit = 6): Array<ExamEvent & { days: number; date: Date }> {
  return EXAM_EVENTS
    .map((ev) => {
      const date = nextOccurrence(ev.month, ev.day)
      return { ...ev, days: daysUntil(date), date }
    })
    .sort((a, b) => a.days - b.days)
    .slice(0, limit)
}
