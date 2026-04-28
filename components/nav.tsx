'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const links = [
  { href: '/papers', label: 'Papers' },
  { href: '/sheets', label: 'Sheets' },
  { href: '/videos', label: 'Videos' },
  { href: '/about',  label: 'About'  },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="border-b border-rule bg-paper/90 backdrop-blur-sm sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <div className="flex h-16 items-center justify-between gap-8">

          {/* Logo — serif italic */}
          <Link
            href="/"
            className="font-serif italic text-[20px] text-ink shrink-0 hover:opacity-70 transition-opacity"
            onClick={() => setOpen(false)}
          >
            Point of Math
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`nav-link font-mono text-[11px] uppercase tracking-widest transition-opacity ${
                  pathname === l.href ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <Link
            href="/papers"
            className="hidden md:block font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-4 py-2 hover:bg-muted transition-colors shrink-0"
          >
            Download Free →
          </Link>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px]"
          >
            <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-200 origin-center ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[1.5px] bg-ink transition-all duration-200 origin-center ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="md:hidden border-t border-rule py-5 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`font-mono text-[12px] uppercase tracking-widest ${
                  pathname === l.href ? 'text-ink' : 'text-muted'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/papers"
              onClick={() => setOpen(false)}
              className="font-mono text-[11px] uppercase tracking-widest bg-ink text-paper px-4 py-2.5 text-center mt-2"
            >
              Download Free →
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
