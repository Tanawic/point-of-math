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

// Approximate annual exam windows — dates shift slightly each year.
// We use these to compute "days until next occurrence" dynamically.
export const EXAM_EVENTS: ExamEvent[] = [
  {
    id: 'soawn-r1',
    name: 'สอวน. รอบ 1',
    nameFull: 'สอวน. คณิตศาสตร์ รอบแรก',
    region: 'Thailand',
    month: 10, day: 15,
    note: 'ประมาณกลางเดือน ต.ค.',
    url: 'https://www.posn.or.th/th/competition/science/math',
  },
  {
    id: 'soawn-r2',
    name: 'สอวน. ค่าย 1',
    nameFull: 'สอวน. คณิตศาสตร์ ค่าย 1',
    region: 'Thailand',
    month: 12, day: 10,
    note: 'ประมาณต้นเดือน ธ.ค.',
    url: 'https://www.posn.or.th/th/competition/science/math',
  },
  {
    id: 'timo-heat',
    name: 'TIMO Heat',
    nameFull: 'Thailand International Mathematical Olympiad — Heat Round',
    region: 'Thailand',
    month: 11, day: 5,
    note: 'ต้นพ.ย. — ป.3 ถึง ม.6',
    url: 'https://thaimath.org/timo',
  },
  {
    id: 'timo-final',
    name: 'TIMO Final',
    nameFull: 'Thailand International Mathematical Olympiad — Final Round',
    region: 'Thailand',
    month: 1, day: 20,
    note: 'กลางม.ค. — เฉพาะผู้ผ่าน Heat',
    url: 'https://thaimath.org/timo',
  },
  {
    id: 'kvis',
    name: 'KVIS รอบ 1',
    nameFull: 'โรงเรียนกำเนิดวิทย์ — รอบแรก',
    region: 'Thailand',
    month: 2, day: 1,
    note: 'ประมาณต้นก.พ.',
    url: 'https://www.kvis.ac.th',
  },
  {
    id: 'pat1',
    name: 'PAT 1',
    nameFull: 'ความถนัดทางคณิตศาสตร์ (TCAS)',
    region: 'Thailand',
    month: 3, day: 10,
    note: 'ประมาณมี.ค. (TCAS)',
    url: 'https://www.mytcas.com',
  },
  {
    id: 'amc-1012',
    name: 'AMC 10/12',
    nameFull: 'American Mathematics Competition 10/12',
    region: 'USA',
    month: 11, day: 8,
    note: 'ต้นพ.ย. (สมัครล่วงหน้า 1 เดือน)',
    url: 'https://maa.org/math-competitions',
  },
  {
    id: 'aime',
    name: 'AIME',
    nameFull: 'American Invitational Mathematics Examination',
    region: 'USA',
    month: 3, day: 20,
    note: 'ประมาณปลายมี.ค.',
    url: 'https://maa.org/math-competitions',
  },
  {
    id: 'apmo',
    name: 'APMO',
    nameFull: 'Asian Pacific Mathematics Olympiad',
    region: 'Asia-Pacific',
    month: 3, day: 10,
    note: 'ประมาณมี.ค. — สำหรับนักเรียน ม.ปลาย',
    url: 'https://www.apmo-official.org',
  },
  {
    id: 'imo',
    name: 'IMO',
    nameFull: 'International Mathematical Olympiad',
    region: 'International',
    month: 7, day: 10,
    note: 'กรกฎาคม — ทีมชาติ 6 คน',
    url: 'https://www.imo-official.org',
  },
  {
    id: 'jbmo',
    name: 'JBMO',
    nameFull: 'Junior Balkan Mathematical Olympiad',
    region: 'Europe',
    month: 6, day: 20,
    note: 'ปลายมิ.ย.',
    url: 'https://artofproblemsolving.com/wiki/index.php/JBMO',
  },
  {
    id: 'hkimo-heat',
    name: 'HKIMO Heat',
    nameFull: 'Hong Kong International Mathematical Olympiad — Heat',
    region: 'Asia-Pacific',
    month: 12, day: 5,
    note: 'ต้นธ.ค.',
    url: 'https://www.hkmo.com.hk',
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
