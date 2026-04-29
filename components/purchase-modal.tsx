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
  const [step, setStep]         = useState<Step>('form')
  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [phone, setPhone]       = useState('')
  const [slip, setSlip]         = useState<File | null>(null)
  const [slipPreview, setSlipPreview] = useState<string | null>(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const fileRef                 = useRef<HTMLInputElement>(null)

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handle)
    return () => window.removeEventListener('keydown', handle)
  }, [onClose])

  function handleSlip(file: File | null) {
    if (!file) return
    setSlip(file)
    const reader = new FileReader()
    reader.onload = (e) => setSlipPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim()) {
      setError('กรุณากรอกชื่อและอีเมล')
      return
    }
    if (!slip) {
      setError('กรุณาแนบสลิปการโอนเงิน')
      return
    }

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
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10,10,10,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-paper w-full max-w-lg max-h-[90vh] overflow-y-auto border border-ink">

        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-rule">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-0.5">
              สมัครเรียน
            </p>
            <h2 className="font-serif italic text-[20px] text-ink leading-tight">
              {courseTitle}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="font-mono text-[20px] text-muted hover:text-ink transition-colors leading-none ml-4"
            aria-label="ปิด"
          >
            ×
          </button>
        </div>

        {step === 'success' ? (
          /* Success state */
          <div className="px-8 py-12 text-center flex flex-col items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10.5l4 4 8-8" stroke="#F8F5F0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <p className="font-sans text-[16px] text-ink font-medium mb-2">ส่งข้อมูลสำเร็จ!</p>
              <p className="font-sans text-[14px] text-muted leading-relaxed">
                เราได้รับสลิปของคุณแล้ว<br />
                ลิงก์วิดีโอจะส่งไปที่ <strong className="text-ink">{email}</strong><br />
                ภายใน 24 ชั่วโมง
              </p>
            </div>
            <button
              onClick={onClose}
              className="font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-8 py-3 hover:bg-muted transition-colors"
            >
              ปิด
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-8 py-6 flex flex-col gap-5">

            {/* PromptPay info */}
            <div className="bg-rule/30 border border-rule px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted mb-1">
                โอนเงิน {priceDisplay} มาที่
              </p>
              <p className="font-sans text-[15px] text-ink font-medium">
                PromptPay: <span className="font-mono">064-xxx-xxxx</span>
              </p>
              <p className="font-sans text-[12px] text-muted mt-0.5">
                ชื่อบัญชี: Point of Math (ดนัลวิชญ์ ...)
              </p>
            </div>

            {/* Name */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                ชื่อ-นามสกุล *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="สมชาย ใจดี"
                className="border border-rule bg-white px-3 py-2.5 font-sans text-[14px] text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                อีเมล * (รับลิงก์วิดีโอที่นี่)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@email.com"
                className="border border-rule bg-white px-3 py-2.5 font-sans text-[14px] text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                เบอร์โทร (ไม่บังคับ)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08x-xxx-xxxx"
                className="border border-rule bg-white px-3 py-2.5 font-sans text-[14px] text-ink placeholder:text-muted/50 focus:outline-none focus:border-ink transition-colors"
              />
            </div>

            {/* Slip upload */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">
                สลิปการโอนเงิน *
              </label>
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
                  <img src={slipPreview} alt="slip" className="w-full max-h-48 object-contain border border-rule" />
                  <button
                    type="button"
                    onClick={() => { setSlip(null); setSlipPreview(null) }}
                    className="absolute top-2 right-2 bg-ink text-paper font-mono text-[10px] px-2 py-1"
                  >
                    เปลี่ยน
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="border border-dashed border-rule px-4 py-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted hover:border-ink hover:text-ink transition-colors"
                >
                  แตะเพื่ออัพโหลดรูปสลิป
                </button>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="font-sans text-[13px] text-red-600">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-mono text-[12px] uppercase tracking-widest bg-ink text-paper py-4 hover:bg-muted transition-colors disabled:opacity-50"
            >
              {loading ? 'กำลังส่ง...' : 'ส่งข้อมูลและสลิป →'}
            </button>

            <p className="font-sans text-[12px] text-muted text-center leading-relaxed">
              เมื่อยืนยันการชำระเงินแล้ว ลิงก์วิดีโอจะส่งไปทางอีเมลภายใน 24 ชั่วโมง
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
