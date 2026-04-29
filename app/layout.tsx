import type { Metadata } from 'next'
import { Anuphan, DM_Serif_Display, Space_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Nav from '@/components/nav'
import Footer from '@/components/footer'
import FloatingCTA from '@/components/floating-cta'

const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const serif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://point-of-math-st39.vercel.app'),
  title: {
    default: 'Point of Math — ข้อสอบ สอวน. SAT AMC KVIS ฟรี',
    template: '%s · Point of Math',
  },
  description:
    'ข้อสอบแข่งขันคณิตศาสตร์ · แบบฝึกหัดโอลิมปิก 15 หน่วย · เฉลย SAT สอวน. PAT1 AMC พสวท. ดาวน์โหลดฟรี ไม่ต้องสมัคร',
  keywords: [
    'ข้อสอบสอวน', 'เฉลยสอวน', 'ข้อสอบ SAT Math', 'เฉลย SAT', 'KVIS รอบ 1',
    'คณิตศาสตร์โอลิมปิก', 'AMC 10', 'AMC 12', 'PAT1', 'แบบฝึกหัดคณิต',
    'point of math', 'math olympiad thailand',
  ],
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    url: 'https://point-of-math-st39.vercel.app',
    siteName: 'Point of Math',
    title: 'Point of Math — ข้อสอบ สอวน. SAT AMC KVIS ฟรี',
    description:
      'ข้อสอบแข่งขันคณิตศาสตร์ · แบบฝึกหัดโอลิมปิก 15 หน่วย · ฟรีทั้งหมด ไม่ต้องสมัคร',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Point of Math — ข้อสอบ สอวน. SAT AMC KVIS ฟรี',
    description: 'ข้อสอบแข่งขันคณิตศาสตร์ · แบบฝึกหัดโอลิมปิก 15 หน่วย · ฟรีทั้งหมด',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${anuphan.variable} ${serif.variable} ${mono.variable}`}>
      <body className="min-h-screen flex flex-col bg-paper text-ink antialiased">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCTA />
        <Analytics />
      </body>
    </html>
  )
}
