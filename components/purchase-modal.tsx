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
    <div
      className="fixed inset-0 z-50 flex"
      style={{
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        backgroundColor: 'rgba(10,10,10,0.55)',
      }}
    >
      {/* ════════════════════════════════════════
          LEFT — course info + payment details
          ════════════════════════════════════════ */}
      <div
        className="hidden md:flex flex-col justify-between bg-ink text-paper"
        style={{ width: 400, minWidth: 400, padding: '48px 44px' }}
      >
        {/* Brand */}
        <div>
          <p className="font-serif italic text-[15px] text-white/40 mb-12 tracking-wide">
            Point of Math
          </p>

          {/* Course + price */}
          <h2 className="font-serif italic text-[34px] leading-[1.1] text-white mb-5">
            {courseTitle}
          </h2>
          <div className="flex items-end gap-3 mb-8">
            <span className="font-mono text-[42px] font-black text-white leading-none">{priceDisplay}</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-white/40 pb-1.5">จ่ายครั้งเดียว</span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* Includes */}
          <div className="flex flex-col gap-3 mb-10">
            {includes.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="8" fill="rgba(255,255,255,0.12)"/>
                  <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-sans text-[14px] text-white/80 leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 mb-8" />

          {/* PromptPay */}
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-3">
            โอนเงินมาที่
          </p>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] text-white/40 mb-1">PromptPay</p>
              <p className="font-mono text-[20px] font-bold text-white tracking-wide leading-none">
                {PROMPTPAY_NUMBER}
              </p>
              <p className="font-sans text-[12px] text-white/40 mt-1">{ACCOUNT_NAME}</p>
            </div>
            {/* QR placeholder — replace with real QR when ready */}
            <div className="w-[72px] h-[72px] border border-white/20 flex items-center justify-center shrink-0 bg-white/5">
              <svg width="36" height="36" viewBox="0 0 32 32" fill="none" className="opacity-30">
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
        <div className="flex items-center gap-3 pt-8 border-t border-white/10">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0 text-white/40">
            <path d="M9 1L11.5 6.5H17L12.5 10l2 6L9 13l-5.5 3 2-6L1 6.5h5.5L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
          </svg>
          <p className="font-sans text-[12px] text-white/40 leading-snug">
            ไม่พอใจภายใน 7 วัน คืนเงินเต็มจำนวน<br/>ไม่มีคำถาม
          </p>
        </div>
      </div>

      {/* ════════════════════════════════════════
          RIGHT — form
          ════════════════════════════════════════ */}
      <div className="flex-1 bg-paper flex flex-col h-full overflow-hidden">

        {/* Close */}
        <div className="flex justify-end px-8 pt-6 shrink-0">
          <button
            onClick={onClose}
            aria-label="ปิด"
            className="w-9 h-9 flex items-center justify-center text-muted hover:text-ink transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {done ? (
          /* Success */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center gap-6">
            <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center"
              style={{ boxShadow: '0 8px 32px rgba(10,10,10,0.14)' }}>
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                <path d="M4 11.5l4.5 4.5 9.5-9.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 className="font-serif italic text-[30px] text-ink mb-3">ส่งข้อมูลสำเร็จ</h3>
              <p className="font-sans text-[14px] text-muted leading-7">
                เราได้รับสลิปของคุณแล้ว<br/>
                ลิงก์วิดีโอจะส่งไปที่<br/>
                <strong className="text-ink">{email}</strong><br/>
                ภายใน 24 ชั่วโมง
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-2 font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-10 py-3 hover:bg-ink hover:text-paper transition-colors"
            >
              ปิด
            </button>
          </div>
        ) : (
          /* Form — no scroll, everything fits */
          <form
            onSubmit={handleSubmit}
            className="flex-1 flex flex-col justify-between px-8 pb-8"
            style={{ gap: 0 }}
          >
            {/* Header */}
            <div className="mb-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">ชำระเงิน</p>
              <h3 className="font-serif italic text-[26px] text-ink leading-tight md:hidden">{courseTitle}</h3>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-5 flex-1">

              <FormRow label="อีเมล" sub="ลิงก์วิดีโอจะส่งมาที่นี่">
                <input
                  type="email" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@email.com"
                  className="w-full border-b-2 border-rule bg-transparent py-2 font-sans text-[16px] font-semibold text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
                />
              </FormRow>

              <FormRow label="ชื่อ-นามสกุล">
                <input
                  type="text" value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="สมชาย ใจดี"
                  className="w-full border-b-2 border-rule bg-transparent py-2 font-sans text-[16px] font-semibold text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
                />
              </FormRow>

              <FormRow label="เบอร์โทร" sub="ไม่บังคับ">
                <input
                  type="tel" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08x-xxx-xxxx"
                  className="w-full border-b-2 border-rule bg-transparent py-2 font-sans text-[16px] font-semibold text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
                />
              </FormRow>

              {/* Slip upload */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                  สลิปการโอนเงิน
                </p>
                <input
                  ref={fileRef} type="file" accept="image/*" className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) applyFile(f) }}
                />
                {slipPreview ? (
                  <div className="relative flex items-center gap-4 border border-rule p-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={slipPreview} alt="slip" className="h-16 w-16 object-cover border border-rule"/>
                    <div className="flex-1 min-w-0">
                      <p className="font-sans text-[13px] text-ink font-semibold truncate">{slip?.name}</p>
                      <p className="font-mono text-[10px] text-muted uppercase tracking-widest">แนบสลิปแล้ว ✓</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => { setSlip(null); setSlipPreview(null) }}
                      className="font-mono text-[10px] uppercase tracking-widest text-muted hover:text-ink transition-colors shrink-0"
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
                    className={`cursor-pointer border-2 border-dashed py-6 flex items-center justify-center gap-3 transition-colors ${
                      dragging ? 'border-ink bg-ink/5' : 'border-rule hover:border-ink'
                    }`}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-muted shrink-0">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-sans text-[14px] text-muted">
                      ลากวางหรือ <span className="text-ink font-semibold underline underline-offset-2">เลือกไฟล์สลิป</span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit section */}
            <div className="flex flex-col gap-3 pt-6">
              {error && (
                <p className="font-sans text-[12px] text-red-600 font-medium">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full font-mono text-[13px] font-bold uppercase tracking-widest bg-ink text-paper py-5 hover:opacity-75 transition-opacity disabled:opacity-30"
              >
                {loading ? 'กำลังส่ง...' : 'ยืนยันการชำระเงิน →'}
              </button>
              <div className="flex items-center justify-center gap-4 pt-1">
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">ปลอดภัย</span>
                <span className="text-muted/30">·</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">คืนเงิน 7 วัน</span>
                <span className="text-muted/30">·</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted/60">ตลอดชีพ</span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function FormRow({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-baseline gap-2 mb-1.5">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
        {sub && <span className="font-sans text-[11px] text-muted/50">{sub}</span>}
      </div>
      {children}
    </div>
  )
}
