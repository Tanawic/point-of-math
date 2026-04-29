'use client'

import { useState } from 'react'
import PurchaseModal from '@/components/purchase-modal'

export default function BuyButton({
  courseId, courseTitle, priceDisplay, includes, label = 'ซื้อเลย →',
}: {
  courseId: string
  courseTitle: string
  priceDisplay: string
  includes: string[]
  label?: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="relative font-mono text-[12px] uppercase tracking-widest bg-ink text-paper px-10 py-4 hover:bg-muted transition-colors overflow-hidden group w-full"
      >
        <span className="absolute inset-0 border border-ink scale-100 opacity-0 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500" />
        {label}
      </button>

      {open && (
        <PurchaseModal
          courseId={courseId}
          courseTitle={courseTitle}
          priceDisplay={priceDisplay}
          includes={includes}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  )
}
