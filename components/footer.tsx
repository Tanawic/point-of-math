import Link from 'next/link'

const links = [
  { href: '/papers', label: 'Papers' },
  { href: '/sheets', label: 'Sheets' },
  { href: '/videos', label: 'Videos' },
  { href: '/about',  label: 'About'  },
]

export default function Footer() {
  return (
    <footer className="border-t border-rule bg-paper relative overflow-hidden">
      {/* Large decorative sigma */}
      <div
        className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 font-mono text-[140px] md:text-[180px] leading-none text-ink select-none pointer-events-none"
        style={{ opacity: 0.035 }}
        aria-hidden
      >
        ∑
      </div>

      <div className="mx-auto max-w-6xl px-6 md:px-10 py-10 md:py-12 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Brand */}
          <Link href="/" className="font-serif italic text-[18px] text-ink hover:opacity-70 transition-opacity">
            Point of Math
          </Link>

          {/* Nav */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-ink transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Contact + copyright */}
          <div className="flex flex-col gap-1">
            <a
              href="mailto:pointofmathcontacts@gmail.com"
              className="font-mono text-[11px] text-muted hover:text-ink transition-colors"
            >
              pointofmathcontacts@gmail.com
            </a>
            <span className="font-mono text-[10px] text-muted/60">© 2026 Point of Math</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
