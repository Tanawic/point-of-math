export interface Course {
  id: string
  title: string
  titleThai: string
  tagline: string
  price: number        // THB (e.g. 590)
  priceDisplay: string // "590 ฿"
  stripePriceId: string | null  // fill in after Stripe dashboard setup
  videoUrls: string[]  // unlisted YouTube URLs sent after purchase
  level: string
  duration: string
  topics: string[]
  includes: string[]
}

export const COURSES: Course[] = [
  {
    id: 'soawn-camp1',
    title: 'สอวน. ค่าย 1 คณิตศาสตร์',
    titleThai: 'เตรียมสอบเข้าค่าย 1 สอวน.',
    tagline: 'ครอบคลุม 15 หน่วย ตั้งแต่ทฤษฎีจำนวนถึงการพิสูจน์ — พร้อมแบบฝึกหัดและเฉลย',
    price: 590,
    priceDisplay: '590',
    stripePriceId: null,
    videoUrls: [],
    level: 'ม.ต้น–ม.ปลาย',
    duration: '15 หน่วย · 30+ ชั่วโมง',
    topics: [
      'ทฤษฎีจำนวน', 'พีชคณิต', 'เรขาคณิต',
      'การนับและความน่าจะเป็น', 'ตรรกศาสตร์และการพิสูจน์',
    ],
    includes: [
      'แบบฝึกหัด PDF 15 หน่วย พร้อมเฉลย',
      'คลิปวิดีโออธิบายทุกบท',
      'ข้อสอบจำลองก่อนสอบจริง',
      'เข้าถึงได้ตลอดชีพ',
    ],
  },
  {
    id: 'sat-math',
    title: 'SAT Math',
    titleThai: 'พิชิต SAT Math 800 คะแนน',
    tagline: 'เทคนิคเฉพาะสำหรับ SAT Digital Math — Algebra, Advanced Math, Problem-Solving & Data Analysis',
    price: 490,
    priceDisplay: '490',
    stripePriceId: null,
    videoUrls: [],
    level: 'ม.4–ม.6',
    duration: '8 หน่วย · 20+ ชั่วโมง',
    topics: [
      'Linear & Quadratic', 'Systems of Equations', 'Functions',
      'Geometry & Trigonometry', 'Statistics & Probability', 'Word Problems',
    ],
    includes: [
      'แบบฝึกหัดตาม SAT Blueprint ทุก Domain',
      'เทคนิคทำข้อสอบ Digital SAT',
      'Mock Test จำลองเงื่อนไขสอบจริง',
      'เข้าถึงได้ตลอดชีพ',
    ],
  },
  {
    id: 'math-competition',
    title: 'Math Competition',
    titleThai: 'เตรียมแข่งคณิตศาสตร์โอลิมปิก',
    tagline: 'สำหรับ AMC 10/12 · AIME · สอวน. ค่าย 2 · IMO Selection — เน้นการพิสูจน์และเทคนิคระดับสูง',
    price: 690,
    priceDisplay: '690',
    stripePriceId: null,
    videoUrls: [],
    level: 'ม.ปลาย (ขั้นสูง)',
    duration: '12 หน่วย · 40+ ชั่วโมง',
    topics: [
      'Number Theory', 'Combinatorics', 'Inequalities',
      'Functional Equations', 'Geometry (Olympiad)', 'Proof Techniques',
    ],
    includes: [
      'Problem Sets จากการแข่งขันจริง AMC/AIME/IMO',
      'เทคนิคการพิสูจน์ระดับโอลิมปิก',
      'Solution Writeups แบบ full-credit',
      'เข้าถึงได้ตลอดชีพ',
    ],
  },
  {
    id: 'kvis-round1',
    title: 'KVIS รอบที่ 1',
    titleThai: 'คัดเลือกโรงเรียนวิทยาศาสตร์ กพว.',
    tagline: 'เตรียมสอบคัดเลือก KVIS (กำแพงเพชรวิทยาสาสตร์) วิชาคณิตศาสตร์รอบแรก — Pattern Recognition และ Problem Solving',
    price: 390,
    priceDisplay: '390',
    stripePriceId: null,
    videoUrls: [],
    level: 'ม.ต้น',
    duration: '6 หน่วย · 15+ ชั่วโมง',
    topics: [
      'Pattern & Sequence', 'Logical Reasoning', 'Basic Number Theory',
      'Algebra ม.ต้น', 'Geometry พื้นฐาน', 'Word Problems',
    ],
    includes: [
      'ข้อสอบ KVIS ย้อนหลังพร้อมเฉลย',
      'แบบฝึกหัดเน้น Pattern Recognition',
      'เทคนิคการทำข้อสอบในเวลาจำกัด',
      'เข้าถึงได้ตลอดชีพ',
    ],
  },
]

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}
