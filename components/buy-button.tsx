'use client'

import { useState } from 'react'

export default function BuyButton({ courseId, label = 'ซื้อคอร์สนี้ →' }: {
  courseId: string
  label?: string
}) {
  const [loading, setLoading] = useState(false)

  async function handleBuy() {
    setLoading(true)
    try {
      const res  = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })
      const data = await res.json()
      if (data.url) window.location.href = data.url
    } catch {
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleBuy}
      disabled={loading}
      className="relative font-mono text-[12px] uppercase tracking-widest bg-ink text-paper px-10 py-4 hover:bg-muted transition-colors disabled:opacity-50 overflow-hidden group"
    >
      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-none border border-ink scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500" />
      {loading ? 'กำลังโหลด...' : label}
    </button>
  )
}
