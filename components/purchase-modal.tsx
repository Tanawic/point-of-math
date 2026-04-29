'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface PurchaseModalProps {
  courseId: string
  courseTitle: string
  priceDisplay: string
  onClose: () => void
}

type Step = 'form' | 'success'

const PROMPTPAY_NUMBER = '064-xxx-xxxx'   // ← ใส่เบอร์จริงที่นี่
const ACCOUNT_NAME     = 'ดนัลวิชญ์ ...' // ← ใส่ชื่อบัญชีจริงที่นี่

export default function PurchaseModal({ courseId, courseTitle, priceDisplay, onClose }: PurchaseModalProps) {
  const [step, setStep]               = useState<Step>('form')
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [slip, setSlip]               = useState<File | null>(null)
  const [slipPreview, setSlipPreview] = useState<string | null>(null)
  const [dragging, setDragging]       = useState(false)
  const [loading, setLoading]         = useState(false)
  const [error, setError]             = useState('')
  const fileRef                       = useRef<HTMLInputElement>(null)

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Escape key
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

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) applyFile(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!email.trim() || !name.trim()) { setError('กรุณากรอกอีเมลและชื่อ'); return }
    if (!slip) { setError('กรุณาแนบสลิปการโอนเงิน'); return }
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
      setStep('success')
    } catch {
      setError('เกิดข้อผิดพลาด กรุณาลองใหม่หรือติดต่อ 05351@pccm.ac.th')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(10,10,10,0.72)', backdropFilter: 'blur(2px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative bg-white w-full sm:mx-4 flex flex-col"
        style={{ maxWidth: 460, maxHeight: '94vh', boxShadow: '0 24px 64px rgba(0,0,0,0.28)' }}
      >
        {/* ── HEADER ── dark strip, price + title */}
        <div className="bg-ink px-7 py-5 flex items-start justify-between shrink-0">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-1">
              สั่งซื้อคอร์ส
            </p>
            <h2 className="font-serif italic text-[19px] text-white leading-tight">
              {courseTitle}
            </h2>
          </div>
          <div className="text-right ml-4 shrink-0">
            <p className="font-mono text-[11px] text-white/40 mb-0.5">ราคา</p>
            <p className="font-mono text-[22px] font-bold text-white leading-none">{priceDisplay}</p>
          </div>
        </div>

        {/* ── SCROLLABLE BODY */}
        <div className="overflow-y-auto">
          {step === 'success' ? (
            // ── SUCCESS ────────────────────────────────────────────────────────
            <div className="px-7 py-14 flex flex-col items-center gap-5 text-center">
              <div className="w-11 h-11 rounded-full bg-ink flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5l4 4 8-8" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-sans text-[16px] font-semibold text-ink mb-2">ส่งข้อมูลสำเร็จแล้ว</p>
                <p className="font-sans text-[13px] text-muted leading-6">
                  เราได้รับสลิปของคุณแล้ว<br/>
                  ลิงก์วิดีโอจะส่งไปที่<br/>
                  <span className="font-medium text-ink">{email}</span><br/>
                  ภายใน 24 ชั่วโมง
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-3 font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-8 py-2.5 hover:bg-ink hover:text-white transition-colors"
              >
                ปิด
              </button>
            </div>
          ) : (
            // ── FORM ───────────────────────────────────────────────────────────
            <form onSubmit={handleSubmit} className="flex flex-col">

              {/* Payment instructions */}
              <div className="px-7 py-5 border-b border-rule">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                  ขั้นตอนที่ 1 — โอนเงิน
                </p>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-sans text-[13px] text-muted mb-0.5">PromptPay</p>
                    <p className="font-mono text-[18px] font-bold text-ink tracking-wide">
                      {PROMPTPAY_NUMBER}
                    </p>
                    <p className="font-sans text-[12px] text-muted mt-0.5">{ACCOUNT_NAME}</p>
                  </div>
                  {/* QR placeholder — swap with real <img> when you have the QR */}
                  <div
                    className="w-16 h-16 border border-rule flex items-center justify-center shrink-0"
                    title="QR PromptPay"
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="opacity-20">
                      <rect x="2" y="2" width="12" height="12" rx="1" stroke="#0A0A0A" strokeWidth="2"/>
                      <rect x="18" y="2" width="12" height="12" rx="1" stroke="#0A0A0A" strokeWidth="2"/>
                      <rect x="2" y="18" width="12" height="12" rx="1" stroke="#0A0A0A" strokeWidth="2"/>
                      <rect x="5" y="5" width="6" height="6" fill="#0A0A0A"/>
                      <rect x="21" y="5" width="6" height="6" fill="#0A0A0A"/>
                      <rect x="5" y="21" width="6" height="6" fill="#0A0A0A"/>
                      <rect x="20" y="18" width="3" height="3" fill="#0A0A0A"/>
                      <rect x="25" y="18" width="3" height="3" fill="#0A0A0A"/>
                      <rect x="20" y="23" width="3" height="3" fill="#0A0A0A"/>
                      <rect x="25" y="25" width="5" height="5" fill="#0A0A0A"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Fields */}
              <div className="px-7 py-5 border-b border-rule flex flex-col gap-5">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted -mb-1">
                  ขั้นตอนที่ 2 — กรอกข้อมูล
                </p>

                <InputField
                  id="pm-email" label="อีเมล" hint="ลิงก์วิดีโอจะส่งมาที่นี่"
                  type="email" value={email} placeholder="student@email.com"
                  onChange={setEmail}
                />
                <InputField
                  id="pm-name" label="ชื่อ-นามสกุล"
                  type="text" value={name} placeholder="สมชาย ใจดี"
                  onChange={setName}
                />
                <InputField
                  id="pm-phone" label="เบอร์โทร" hint="ไม่บังคับ"
                  type="tel" value={phone} placeholder="08x-xxx-xxxx"
                  onChange={setPhone}
                />
              </div>

              {/* Slip upload */}
              <div className="px-7 py-5 border-b border-rule">
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-3">
                  ขั้นตอนที่ 3 — แนบสลิป
                </p>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) applyFile(f) }}
                />
                {slipPreview ? (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={slipPreview}
                      alt="slip"
                      className="w-full max-h-40 object-contain border border-rule"
                    />
                    <button
                      type="button"
                      onClick={() => { setSlip(null); setSlipPreview(null) }}
                      className="absolute top-2 right-2 font-mono text-[10px] uppercase tracking-widest bg-ink text-white px-2 py-1 hover:opacity-70 transition-opacity"
                    >
                      เปลี่ยน
                    </button>
                  </div>
                ) : (
                  <div
                    onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={onDrop}
                    onClick={() => fileRef.current?.click()}
                    className={`cursor-pointer border-2 border-dashed py-8 flex flex-col items-center gap-2 transition-colors ${
                      dragging ? 'border-ink bg-ink/5' : 'border-rule hover:border-ink'
                    }`}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-muted">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-sans text-[13px] text-muted">
                      ลากวางหรือ <span className="text-ink underline">เลือกไฟล์</span>
                    </p>
                    <p className="font-mono text-[10px] text-muted/60 uppercase tracking-widest">
                      JPG · PNG · max 10 MB
                    </p>
                  </div>
                )}
              </div>

              {/* Submit */}
              <div className="px-7 py-5 flex flex-col gap-3">
                {error && (
                  <p className="font-sans text-[12px] text-red-600">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-mono text-[11px] uppercase tracking-widest bg-ink text-white py-4 hover:opacity-70 transition-opacity disabled:opacity-30"
                >
                  {loading ? 'กำลังส่ง...' : 'ส่งข้อมูลและสลิป →'}
                </button>
                <p className="font-sans text-[11px] text-muted text-center">
                  ลิงก์วิดีโอจะส่งทางอีเมลภายใน 24 ชั่วโมงหลังยืนยันการชำระเงิน
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  )
}

function InputField({
  id, label, hint, type, value, placeholder, onChange,
}: {
  id: string; label: string; hint?: string; type: string
  value: string; placeholder: string; onChange: (v: string) => void
}) {
  return (
    <div>
      <label htmlFor={id} className="flex gap-2 items-baseline mb-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
        {hint && <span className="font-sans text-[10px] text-muted/60">{hint}</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-rule bg-transparent py-2 font-sans text-[14px] text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  )
}
