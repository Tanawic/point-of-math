'use client'

import Link from 'next/link'
import { useState } from 'react'

const links = [
  { href: '/papers', label: 'Papers' },
  { href: '/sheets', label: 'Sheets' },
  { href: '/videos', label: 'Videos' },
  { href: '/about', label: 'About' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-rule bg-paper">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="text-[14px] font-bold uppercase tracking-widest text-ink"
            onClick={() => setOpen(false)}
          >
            POINT OF MATH
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-[12px] uppercase tracking-widest text-ink hover:underline underline-offset-4 decoration-ink"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-8 h-8 border border-ink"
          >
            <span
              className={`block w-4 h-px bg-ink transition-transform ${
                open ? 'translate-y-[3px] rotate-45' : '-translate-y-[3px]'
              }`}
            />
            <span
              className={`block w-4 h-px bg-ink transition-transform ${
                open ? '-translate-y-0 -rotate-45' : 'translate-y-[3px]'
              }`}
            />
          </button>
        </div>

        {/* Mobile menu panel */}
        {open && (
          <nav className="md:hidden border-t border-rule py-4 flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[12px] uppercase tracking-widest text-ink hover:underline underline-offset-4"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  )
}
