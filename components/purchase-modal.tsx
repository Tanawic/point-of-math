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
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่หรือติดต่อ 05351@pccm.ac.th')
    } finally {
      setLoading(false)
    }
  }

  return (
    /* Exactly the viewport — no scroll ever */
    <div
      className="fixed inset-0 z-50 flex"
      style={{
        height: '100dvh',           // dynamic viewport height (handles mobile chrome bar)
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        backgroundColor: 'rgba(10,10,10,0.5)',
      }}
    >
      {/* ── LEFT PANEL (ink, desktop only) ── */}
      <div
        className="hidden md:flex flex-col bg-ink text-paper shrink-0"
        style={{ width: 380, padding: '36px 40px' }}
      >
        <p className="font-serif italic text-[14px] text-white/35 mb-8 tracking-wide">
          Point of Math
        </p>

        <h2 className="font-serif italic text-[28px] leading-tight text-white mb-3">
          {courseTitle}
        </h2>
        <div className="flex items-end gap-2 mb-6">
          <span className="font-mono text-[36px] font-black text-white leading-none">{priceDisplay}</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-white/35 pb-1">จ่ายครั้งเดียว</span>
        </div>

        <div className="h-px bg-white/10 mb-5" />

        {/* Includes */}
        <div className="flex flex-col gap-2.5 mb-6">
          {includes.map((item) => (
            <div key={item} className="flex items-start gap-2.5">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 mt-0.5">
                <circle cx="7" cy="7" r="7" fill="rgba(255,255,255,0.12)"/>
                <path d="M3.5 7.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-sans text-[13px] text-white/75 leading-snug">{item}</span>
            </div>
          ))}
        </div>

        <div className="h-px bg-white/10 mb-5" />

        {/* PromptPay */}
        <p className="font-mono text-[9px] uppercase tracking-widest text-white/35 mb-2">โอนเงินมาที่</p>
        <div className="flex items-center justify-between gap-3 mb-auto">
          <div>
            <p className="font-mono text-[9px] text-white/35 mb-0.5">PromptPay</p>
            <p className="font-mono text-[18px] font-bold text-white tracking-wide leading-none">
              {PROMPTPAY_NUMBER}
            </p>
            <p className="font-sans text-[11px] text-white/35 mt-1">{ACCOUNT_NAME}</p>
          </div>
          {/* QR placeholder */}
          <div className="w-16 h-16 border border-white/20 flex items-center justify-center shrink-0 bg-white/5">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="opacity-25">
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

        {/* Guarantee */}
        <div className="flex items-center gap-2.5 pt-5 border-t border-white/10 mt-6">
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="shrink-0 text-white/30">
            <path d="M9 1l2.5 5.5H17l-4.5 3.5 2 5.5L9 12.5l-5.5 3 2-5.5L1 6.5h5.5L9 1z"
              stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
          <p className="font-sans text-[11px] text-white/35 leading-snug">
            ไม่พอใจภายใน 7 วัน คืนเงินเต็มจำนวน
          </p>
        </div>
      </div>

      {/* ── RIGHT PANEL (form) ── full height, no scroll */}
      <div className="flex-1 bg-paper flex flex-col overflow-hidden" style={{ height: '100dvh' }}>

        {/* Top bar — close */}
        <div className="flex items-center justify-between px-7 pt-5 pb-3 shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted">ชำระเงิน</p>
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {done ? (
          /* ── SUCCESS ── */
          <div className="flex-1 flex flex-col items-center justify-center px-7 text-center gap-5">
            <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10.5l4 4 8-8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-serif italic text-[26px] text-ink mb-2">ส่งข้อมูลสำเร็จ</h3>
              <p className="font-sans text-[13px] text-muted leading-6">
                เราได้รับสลิปของคุณแล้ว<br/>
                ลิงก์วิดีโอจะส่งไปที่ <strong className="text-ink">{email}</strong><br/>
                ภายใน 24 ชั่วโมง
              </p>
            </div>
            <button
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-8 py-2.5 hover:bg-ink hover:text-paper transition-colors"
            >
              ปิด
            </button>
          </div>
        ) : (
          /* ── FORM — fills remaining height exactly ── */
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col px-7 pb-5 overflow-hidden"
          >
            {/* mobile: show title */}
            <p className="font-serif italic text-[20px] text-ink mb-4 md:hidden leading-tight">{courseTitle}</p>

            {/* Fields — flex-1 fills space, justify-between spaces them evenly */}
            <div className="flex-1 flex flex-col justify-between">

              <CField label="อีเมล" sub="ลิงก์วิดีโอจะส่งมาที่นี่">
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@email.com"
                  className="w-full border-b-2 border-rule bg-transparent py-1.5 font-sans text-[15px] font-semibold text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
                />
              </CField>

              <CField label="ชื่อ-นามสกุล">
                <input
                  type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="สมชาย ใจดี"
                  className="w-full border-b-2 border-rule bg-transparent py-1.5 font-sans text-[15px] font-semibold text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
                />
              </CField>

              <CField label="เบอร์โทร" sub="ไม่บังคับ">
                <input
                  type="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08x-xxx-xxxx"
                  className="w-full border-b-2 border-rule bg-transparent py-1.5 font-sans text-[15px] font-semibold text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
                />
              </CField>

              {/* Slip upload */}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-muted mb-2">
                  สลิปการโอนเงิน
                </p>
                <input
                  ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) applyFile(f) }}
                />
                {slipPreview ? (
                  <div className="flex items-center gap-3 border border-rule px-3 py-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slipPreview} alt="slip" className="h-10 w-10 object-cover border border-rule shrink-0"/>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink flex-1 truncate">
                      แนบสลิปแล้ว ✓
                    </span>
                    <button
                      type="button"
                      onClick={() => { setSlip(null); setSlipPreview(null) }}
                      className="font-mono text-[9px] uppercase tracking-widest text-muted hover:text-ink transition-colors"
                    >
                      เปลี่ยน
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault(); setDragging(false)
                      const f = e.dataTransfer.files[0]; if (f) applyFile(f)
                    }}
                    onClick={() => fileRef.current?.click()}
                    className={`cursor-pointer border-2 border-dashed py-5 flex items-center justify-center gap-2.5 transition-colors ${
                      dragging ? 'border-ink bg-ink/5' : 'border-rule hover:border-ink'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-muted shrink-0">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-sans text-[13px] text-muted">
                      ลากวางหรือ <span className="text-ink font-semibold underline underline-offset-2">เลือกไฟล์สลิป</span>
                    </span>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="flex flex-col gap-2">
                {error && <p className="font-sans text-[11px] text-red-600 font-medium">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-mono text-[12px] font-bold uppercase tracking-widest bg-ink text-paper py-4 hover:opacity-70 transition-opacity disabled:opacity-30"
                >
                  {loading ? 'กำลังส่ง...' : 'ยืนยันการชำระเงิน →'}
                </button>
                <div className="flex items-center justify-center gap-3">
                  {['ปลอดภัย', 'คืนเงิน 7 วัน', 'ตลอดชีพ'].map((t, i, a) => (
                    <span key={t} className="flex items-center gap-3">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-muted/50">{t}</span>
                      {i < a.length - 1 && <span className="text-muted/25 text-xs">·</span>}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function CField({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5 mb-1">
        <span className="font-mono text-[9px] uppercase tracking-widest text-muted">{label}</span>
        {sub && <span className="font-sans text-[10px] text-muted/45">{sub}</span>}
      </div>
      {children}
    </div>
  )
}
