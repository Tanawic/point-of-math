'use client'

import { useState, useRef, useEffect, useCallback } from 'react'

interface PurchaseModalProps {
  courseId: string
  courseTitle: string
  priceDisplay: string
  onClose: () => void
}

type Step = 'form' | 'success'

const PROMPTPAY_NUMBER = '064-xxx-xxxx'
const ACCOUNT_NAME     = 'ดนัลวิชญ์ ...'

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
    /* Full-screen frosted overlay — page behind is visible and blurred */
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      style={{
        backgroundColor: 'rgba(248, 245, 240, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
      }}
    >
      {/* Close — top right, always visible */}
      <button
        onClick={onClose}
        aria-label="ปิด"
        className="fixed top-6 right-6 z-10 w-10 h-10 flex items-center justify-center text-muted hover:text-ink transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M1 1l14 14M15 1L1 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>

      {/* Centered content container */}
      <div className="min-h-full flex flex-col items-center justify-center py-16 px-6">
        <div className="w-full" style={{ maxWidth: 520 }}>

          {/* Brand mark */}
          <p className="font-serif italic text-[16px] text-muted mb-10 text-center tracking-wide">
            Point of Math
          </p>

          {step === 'success' ? (
            // ── SUCCESS ──────────────────────────────────────────────────────
            <div className="flex flex-col items-center gap-6 text-center">
              <div
                className="w-14 h-14 rounded-full bg-ink flex items-center justify-center"
                style={{ boxShadow: '0 8px 32px rgba(10,10,10,0.18)' }}
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <path d="M4 11.5l4.5 4.5 9.5-9.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              <div>
                <h2 className="font-serif italic text-[32px] text-ink mb-3 leading-tight">
                  ส่งข้อมูลสำเร็จ
                </h2>
                <p className="font-sans text-[15px] text-muted leading-7">
                  เราได้รับสลิปของคุณแล้ว<br/>
                  ลิงก์วิดีโอจะส่งไปที่<br/>
                  <span className="text-ink font-medium">{email}</span><br/>
                  ภายใน 24 ชั่วโมง
                </p>
              </div>

              <button
                onClick={onClose}
                className="mt-4 font-mono text-[11px] uppercase tracking-widest border border-ink text-ink px-10 py-3 hover:bg-ink hover:text-paper transition-colors"
              >
                กลับสู่หน้าหลัก
              </button>
            </div>

          ) : (
            // ── FORM ─────────────────────────────────────────────────────────
            <form onSubmit={handleSubmit} className="flex flex-col gap-0">

              {/* Course + price */}
              <div className="text-center mb-10">
                <h2 className="font-serif italic text-[36px] md:text-[44px] text-ink leading-tight mb-3">
                  {courseTitle}
                </h2>
                <div className="inline-flex items-center gap-3">
                  <span className="font-mono text-[28px] font-bold text-ink">{priceDisplay}</span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted border border-rule px-2 py-1">
                    ครั้งเดียว
                  </span>
                </div>
              </div>

              {/* ── STEP 1: Payment ── */}
              <StepBlock number="01" label="โอนเงินมาที่">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-muted mb-1">PromptPay</p>
                    <p className="font-mono text-[24px] font-bold text-ink tracking-wide leading-none">
                      {PROMPTPAY_NUMBER}
                    </p>
                    <p className="font-sans text-[13px] text-muted mt-1">{ACCOUNT_NAME}</p>
                  </div>
                  {/* QR placeholder — replace with <img src="/qr.png" .../> when ready */}
                  <div className="w-20 h-20 border border-rule flex items-center justify-center shrink-0 bg-white">
                    <svg width="40" height="40" viewBox="0 0 32 32" fill="none" className="opacity-20">
                      <rect x="2" y="2" width="12" height="12" rx="1" stroke="#0A0A0A" strokeWidth="2"/>
                      <rect x="18" y="2" width="12" height="12" rx="1" stroke="#0A0A0A" strokeWidth="2"/>
                      <rect x="2" y="18" width="12" height="12" rx="1" stroke="#0A0A0A" strokeWidth="2"/>
                      <rect x="5" y="5" width="6" height="6" fill="#0A0A0A"/>
                      <rect x="21" y="5" width="6" height="6" fill="#0A0A0A"/>
                      <rect x="5" y="21" width="6" height="6" fill="#0A0A0A"/>
                      <rect x="20" y="18" width="3" height="3" fill="#0A0A0A"/>
                      <rect x="25" y="18" width="3" height="3" fill="#0A0A0A"/>
                      <rect x="20" y="23" width="3" height="3" fill="#0A0A0A"/>
                      <rect x="26" y="26" width="4" height="4" fill="#0A0A0A"/>
                    </svg>
                  </div>
                </div>
              </StepBlock>

              {/* ── STEP 2: Fields ── */}
              <StepBlock number="02" label="กรอกข้อมูลของคุณ">
                <div className="flex flex-col gap-6">
                  <InputField
                    id="pm-email" label="อีเมล" hint="— ลิงก์วิดีโอจะส่งมาที่นี่"
                    type="email" value={email} placeholder="student@email.com"
                    onChange={setEmail}
                  />
                  <InputField
                    id="pm-name" label="ชื่อ-นามสกุล"
                    type="text" value={name} placeholder="สมชาย ใจดี"
                    onChange={setName}
                  />
                  <InputField
                    id="pm-phone" label="เบอร์โทร" hint="— ไม่บังคับ"
                    type="tel" value={phone} placeholder="08x-xxx-xxxx"
                    onChange={setPhone}
                  />
                </div>
              </StepBlock>

              {/* ── STEP 3: Slip ── */}
              <StepBlock number="03" label="แนบสลิปการโอนเงิน">
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
                      className="w-full max-h-52 object-contain border border-rule bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => { setSlip(null); setSlipPreview(null) }}
                      className="absolute top-2 right-2 font-mono text-[10px] uppercase tracking-widest bg-ink text-paper px-3 py-1.5 hover:opacity-70 transition-opacity"
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
                    className={`cursor-pointer border-2 border-dashed py-10 flex flex-col items-center gap-2.5 transition-all ${
                      dragging ? 'border-ink bg-ink/5' : 'border-rule hover:border-ink'
                    }`}
                  >
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-muted">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"
                        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="font-sans text-[14px] text-muted">
                      ลากวางไฟล์หรือ <span className="text-ink underline underline-offset-2">เลือกรูปภาพ</span>
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted/50">
                      JPG · PNG · สูงสุด 10 MB
                    </p>
                  </div>
                )}
              </StepBlock>

              {/* Submit */}
              <div className="mt-8 flex flex-col gap-3">
                {error && (
                  <p className="font-sans text-[12px] text-red-600 text-center">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-mono text-[12px] uppercase tracking-widest bg-ink text-paper py-5 hover:opacity-70 transition-opacity disabled:opacity-30"
                  style={{ letterSpacing: '0.12em' }}
                >
                  {loading ? 'กำลังส่ง...' : 'ส่งข้อมูลและสลิป →'}
                </button>
                <p className="font-sans text-[11px] text-muted text-center leading-relaxed">
                  ลิงก์วิดีโอจะส่งทางอีเมลภายใน 24 ชั่วโมง หลังจากยืนยันการชำระเงิน
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ─────────────────────────────────────────────────────────── */

function StepBlock({ number, label, children }: { number: string; label: string; children: React.ReactNode }) {
  return (
    <div className="py-8 border-t border-rule">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-[11px] text-muted/50">{number}</span>
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">{label}</span>
      </div>
      {children}
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
      <label htmlFor={id} className="flex gap-1.5 items-baseline mb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted">{label}</span>
        {hint && <span className="font-sans text-[11px] text-muted/50">{hint}</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border-b border-rule bg-transparent py-2.5 font-sans text-[15px] text-ink placeholder:text-muted/30 focus:outline-none focus:border-ink transition-colors"
      />
    </div>
  )
}
