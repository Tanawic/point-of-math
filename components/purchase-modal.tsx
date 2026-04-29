'use client'

import { useState, useRef, useEffect } from 'react'

interface PurchaseModalProps {
  courseId: string
  courseTitle: string
  priceDisplay: string
  onClose: () => void
}

type Step = 'form' | 'success'

export default function PurchaseModal({ courseId, courseTitle, priceDisplay, onClose }: PurchaseModalProps) {
  const [step, setStep]               = useState<Step>('form')
  const [name, setName]               = useState('')
  const [email, setEmail]             = useState('')
  const [phone, setPhone]             = useState('')
  const [slip, setSlip]               = useState<File | null>(null)
  const [slipPreview, setSlipPreview] = useState<string | null>(null)
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

  function handleSlip(file: File | null) {
    if (!file) return
    setSlip(file)
    const r = new FileReader()
    r.onload = (e) => setSlipPreview(e.target?.result as string)
    r.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim()) { setError('กรุณากรอกชื่อและอีเมล'); return }
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(10,10,10,0.75)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="relative bg-white w-full mx-4 flex flex-col"
        style={{ maxWidth: 480, maxHeight: '92vh' }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="ปิด"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted hover:text-ink transition-colors z-10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto">

          {/* Top bar */}
          <div className="px-8 pt-8 pb-6 border-b border-rule">
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">สั่งซื้อคอร์ส</p>
            <h2 className="font-serif italic text-[22px] text-ink leading-tight pr-8">{courseTitle}</h2>
          </div>

          {step === 'success' ? (
            <div className="px-8 py-12 flex flex-col items-center gap-5 text-center">
              <div className="w-10 h-10 rounded-full bg-ink flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3.5 9.5l3.5 3.5 7.5-8" stroke="#F8F5F0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <p className="font-sans text-[16px] font-medium text-ink mb-1">ส่งข้อมูลสำเร็จ</p>
                <p className="font-sans text-[13px] text-muted leading-relaxed">
                  เราได้รับสลิปแล้ว<br/>
                  ลิงก์วิดีโอจะส่งไปที่ <span className="text-ink font-medium">{email}</span><br/>
                  ภายใน 24 ชั่วโมง
                </p>
              </div>
              <button
                onClick={onClose}
                className="mt-2 font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-8 py-3 hover:opacity-70 transition-opacity"
              >
                ปิด
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-6">

              {/* Payment info */}
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                  โอนเงิน {priceDisplay} มาที่
                </p>
                <p className="font-sans text-[15px] text-ink">
                  PromptPay <span className="font-mono font-medium">064-xxx-xxxx</span>
                </p>
                <p className="font-mono text-[11px] text-muted mt-0.5">ชื่อบัญชี: ดนัลวิชญ์ ...</p>
                <div className="mt-3 h-px bg-rule" />
              </div>

              {/* Fields */}
              <div className="flex flex-col gap-5">
                <Field label="ชื่อ-นามสกุล *" htmlFor="pm-name">
                  <input
                    id="pm-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="สมชาย ใจดี"
                    className="w-full border-b border-rule bg-transparent py-2 font-sans text-[14px] text-ink placeholder:text-muted/40 focus:outline-none focus:border-ink transition-colors"
                  />
                </Field>

                <Field label="อีเมล * — ลิงก์วิดีโอจะส่งมาที่นี่" htmlFor="pm-email">
                  <input
                    id="pm-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@email.com"
                    className="w-full border-b border-rule bg-transparent py-2 font-sans text-[14px] text-ink placeholder:text-muted/40 focus:outline-none focus:border-ink transition-colors"
                  />
                </Field>

                <Field label="เบอร์โทร (ไม่บังคับ)" htmlFor="pm-phone">
                  <input
                    id="pm-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="08x-xxx-xxxx"
                    className="w-full border-b border-rule bg-transparent py-2 font-sans text-[14px] text-ink placeholder:text-muted/40 focus:outline-none focus:border-ink transition-colors"
                  />
                </Field>

                {/* Slip upload */}
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-2">
                    สลิปการโอนเงิน *
                  </p>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleSlip(e.target.files?.[0] ?? null)}
                  />
                  {slipPreview ? (
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={slipPreview}
                        alt="slip preview"
                        className="w-full max-h-44 object-contain border border-rule"
                      />
                      <button
                        type="button"
                        onClick={() => { setSlip(null); setSlipPreview(null) }}
                        className="absolute top-2 right-2 font-mono text-[10px] uppercase tracking-widest bg-ink text-paper px-2 py-1 hover:opacity-70 transition-opacity"
                      >
                        เปลี่ยน
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="w-full border border-dashed border-rule py-8 font-mono text-[11px] uppercase tracking-widest text-muted hover:border-ink hover:text-ink transition-colors"
                    >
                      + แนบรูปสลิป
                    </button>
                  )}
                </div>
              </div>

              {error && (
                <p className="font-sans text-[12px] text-red-600 -mt-2">{error}</p>
              )}

              <div className="flex flex-col gap-3 pt-1 pb-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full font-mono text-[11px] uppercase tracking-widest bg-ink text-paper py-4 hover:opacity-70 transition-opacity disabled:opacity-40"
                >
                  {loading ? 'กำลังส่ง...' : 'ส่งข้อมูลและสลิป →'}
                </button>
                <p className="font-sans text-[11px] text-muted text-center">
                  ลิงก์วิดีโอจะส่งไปทางอีเมลภายใน 24 ชั่วโมง
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
        {label}
      </label>
      {children}
    </div>
  )
}
