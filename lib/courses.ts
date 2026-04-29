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
    priceDisplay: '590 ฿',
    stripePriceId: null,   // TODO: replace with price_xxxx from Stripe dashboard
    videoUrls: [
      // TODO: add your unlisted YouTube URLs here after uploading
      // 'https://youtu.be/...',
    ],
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
]

export function getCourse(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id)
}
