'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <Link
        href="/papers"
        className="block text-[11px] uppercase tracking-widest bg-ink text-paper px-5 py-3 border border-ink hover:bg-paper hover:text-ink transition-colors"
      >
        ข้อสอบฟรี →
      </Link>
    </div>
  )
}
