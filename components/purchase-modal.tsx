'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface PurchaseModalProps {
  courseId: string
  courseTitle: string
  priceDisplay: string
  includes: string[]
  onClose: () => void
}

const PROMPTPAY_NUMBER = '064-xxx-xxxx'
const ACCOUNT_NAME     = 'ดนัลวิชญ์ ...'

export default function PurchaseModal({
  courseId, courseTitle, priceDisplay, includes, onClose,
}: PurchaseModalProps) {
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [slip, setSlip]               = useState<File | null>(null)
  const [slipPreview, setSlipPreview] = useState<string | null>(null)
  const [dragging, setDragging]       = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const [done, setDone]               = useState(false)
  const fileRef                       = useRef<HTMLInputElement>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [onClose])

  const applyFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return
    setSlip(file)
    const r = new FileReader()
    r.onload = (e) => setSlipPreview(e.target?.result as string)
    r.readAsDataURL(file)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !name.trim()) { setError('กรุณากรอกอีเมลและชื่อ'); return }
    if (!slip) { setError('กรุณาแนบสลิป'); return }
    setLoading(true)
    try {
      const fd = new FormData()
      fd.append('courseId', courseId)
      fd.append('name', name.trim())
      fd.append('email', email.trim())
      fd.append('phone', phone.trim())
      fd.append('slip', slip)
      const res = await fetch('/api/order', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setDone(true)
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่หรือติดต่อ pointofmathcontacts@gmail.com')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', backgroundColor: 'rgba(10,10,10,0.45)' }}
    >

      {/* ══ LEFT — dark info panel ══ */}
      <div className="hidden md:flex flex-col bg-ink shrink-0" style={{ width: 380 }}>
        <div className="flex flex-col flex-1 px-10 py-10">

          {/* Brand */}
          <p className="font-sans text-[13px] text-white/30 mb-10 tracking-widest">
            Point of Math
          </p>

          {/* Course title */}
          <h2 className="font-sans font-medium text-[24px] leading-snug text-white mb-3">
            {courseTitle}
          </h2>

          {/* Price */}
          <div className="flex items-end gap-2 mb-8">
            <span className="font-mono font-bold text-[52px] text-white leading-none">{priceDisplay}</span>
            <span className="font-sans font-medium text-[20px] text-white/70 pb-1.5">฿</span>
            <span className="font-sans text-[12px] text-white/30 pb-2">จ่ายครั้งเดียว</span>
          </div>

          <div className="h-px bg-white/10 mb-6" />

          {/* Includes */}
          <div className="flex flex-col gap-3 mb-8">
            {includes.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 3.5-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <span className="font-sans font-semibold text-[14px] text-white/80">{item}</span>
              </div>
            ))}
          </div>

          <div className="h-px bg-white/10 mb-6" />

          {/* PromptPay — font-mono ok here (Latin digits) */}
          <p className="font-sans font-bold text-[11px] uppercase tracking-widest text-white/40 mb-3">
            โอนเงินมาที่
          </p>
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-sans text-[11px] text-white/30 mb-1">PromptPay</p>
              <p className="font-mono text-[22px] font-black text-white tracking-wide leading-none">
                {PROMPTPAY_NUMBER}
              </p>
              <p className="font-sans font-semibold text-[12px] text-white/40 mt-1">{ACCOUNT_NAME}</p>
            </div>
            {/* QR — replace SVG with <img src="/qr.png"/> when ready */}
            <div className="w-[68px] h-[68px] border border-white/20 bg-white/5 flex items-center justify-center shrink-0">
              <svg width="34" height="34" viewBox="0 0 32 32" fill="none" className="opacity-30">
                <rect x="2" y="2" width="12" height="12" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="18" y="2" width="12" height="12" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="2" y="18" width="12" height="12" rx="1" stroke="white" strokeWidth="2"/>
                <rect x="5" y="5" width="6" height="6" fill="white"/>
                <rect x="21" y="5" width="6" height="6" fill="white"/>
                <rect x="5" y="21" width="6" height="6" fill="white"/>
                <rect x="20" y="18" width="3" height="3" fill="white"/>
                <rect x="25" y="18" width="3" height="3" fill="white"/>
                <rect x="20" y="23" width="3" height="3" fill="white"/>
                <rect x="26" y="26" width="4" height="4" fill="white"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Guarantee */}
        <div className="px-10 py-5 border-t border-white/10 flex items-center gap-3">
          <svg width="13" height="13" viewBox="0 0 18 20" fill="none" className="shrink-0 text-white/25">
            <path d="M9 1l2 6h6l-5 3.5 2 6L9 13l-5 3.5 2-6L1 7h6L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
          <p className="font-sans font-bold text-[11px] uppercase tracking-widest text-white/30">
            คืนเงิน 100% ภายใน 7 วัน
          </p>
        </div>
      </div>

      {/* ══ RIGHT — form ══ */}
      <div className="flex-1 bg-paper flex flex-col" style={{ minWidth: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between px-10 pt-8 pb-6 shrink-0">
          <p className="font-sans font-bold text-[13px] uppercase tracking-widest text-ink">
            ชำระเงิน
          </p>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {done ? (
          <div className="flex-1 flex flex-col items-center justify-center px-10 text-center gap-5">
            <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10.5l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-sans font-bold text-[26px] text-ink mb-2">ส่งข้อมูลสำเร็จ</h3>
              <p className="font-sans text-[14px] text-muted leading-7">
                ลิงก์วิดีโอจะส่งไปที่<br/>
                <strong className="text-ink text-[15px] font-bold">{email}</strong><br/>
                ภายใน 24 ชั่วโมง
              </p>
            </div>
            <button
              onClick={onClose}
              className="font-sans font-bold text-[12px] uppercase tracking-widest border border-ink text-ink px-10 py-3 hover:bg-ink hover:text-paper transition-colors"
            >
              ปิด
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-10 pb-8" style={{ minHeight: 0 }}>

            {/* ── Email ── */}
            <div className="flex-1 flex flex-col justify-center border-b border-rule">
              <label className="font-sans font-bold text-[12px] uppercase tracking-widest text-ink mb-1">
                อีเมล
                <span className="font-sans font-normal normal-case tracking-normal text-[12px] text-muted ml-2">
                  — ลิงก์วิดีโอจะส่งมาที่นี่
                </span>
              </label>
              <input
                type="email" value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@email.com"
                className="w-full bg-transparent py-2 font-sans font-semibold text-[16px] text-ink placeholder:text-muted/25 focus:outline-none"
              />
            </div>

            {/* ── Name ── */}
            <div className="flex-1 flex flex-col justify-center border-b border-rule">
              <label className="font-sans font-bold text-[12px] uppercase tracking-widest text-ink mb-1">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="สมชาย ใจดี"
                className="w-full bg-transparent py-2 font-sans font-semibold text-[16px] text-ink placeholder:text-muted/25 focus:outline-none"
              />
            </div>

            {/* ── Phone ── */}
            <div className="flex-1 flex flex-col justify-center border-b border-rule">
              <label className="font-sans font-bold text-[12px] uppercase tracking-widest text-ink mb-1">
                เบอร์โทร
                <span className="font-sans font-normal normal-case tracking-normal text-[12px] text-muted ml-2">
                  — ไม่บังคับ
                </span>
              </label>
              <input
                type="tel" value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08x-xxx-xxxx"
                className="w-full bg-transparent py-2 font-sans font-semibold text-[16px] text-ink placeholder:text-muted/25 focus:outline-none"
              />
            </div>

            {/* ── Slip ── */}
            <div className="flex-1 flex flex-col justify-center border-b border-rule">
              <label className="font-sans font-bold text-[12px] uppercase tracking-widest text-ink mb-2">
                สลิปการโอนเงิน
              </label>
              <input
                ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) applyFile(f) }}
              />
              {slipPreview ? (
                <div className="flex items-center gap-3 py-1">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={slipPreview} alt="slip" className="h-9 w-9 object-cover border border-rule shrink-0"/>
                  <span className="font-sans font-bold text-[13px] text-ink flex-1 truncate">แนบสลิปแล้ว ✓</span>
                  <button
                    type="button"
                    onClick={() => { setSlip(null); setSlipPreview(null) }}
                    className="font-sans font-semibold text-[12px] text-muted hover:text-ink transition-colors"
                  >
                    เปลี่ยน
                  </button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={(e) => { e.preventDefault(); setDragging(false); const f = e.dataTransfer.files[0]; if (f) applyFile(f) }}
                  onClick={() => fileRef.current?.click()}
                  className={`cursor-pointer border-2 border-dashed flex items-center justify-center gap-2.5 py-4 transition-colors ${
                    dragging ? 'border-ink bg-ink/5' : 'border-rule hover:border-ink'
                  }`}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="text-muted">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-sans text-[14px] text-muted">
                    ลากวางหรือ <span className="font-bold text-ink underline underline-offset-2">เลือกไฟล์สลิป</span>
                  </span>
                </div>
              )}
            </div>

            {/* ── Submit ── */}
            <div className="flex-1 flex flex-col justify-center gap-2">
              {error && <p className="font-sans font-semibold text-[12px] text-red-600">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="w-full font-sans font-black text-[14px] uppercase tracking-widest bg-ink text-paper py-4 hover:opacity-70 transition-opacity disabled:opacity-30"
              >
                {loading ? 'กำลังส่ง...' : 'ยืนยันการชำระเงิน →'}
              </button>
              <div className="flex items-center justify-center gap-3">
                {['ปลอดภัย', 'คืนเงิน 7 วัน', 'ตลอดชีพ'].map((t, i, a) => (
                  <span key={t} className="flex items-center gap-3">
                    <span className="font-sans font-semibold text-[10px] uppercase tracking-widest text-muted/40">{t}</span>
                    {i < a.length - 1 && <span className="text-muted/20">·</span>}
                  </span>
                ))}
              </div>
            </div>

          </form>
        )}
      </div>
    </div>
  )
}
