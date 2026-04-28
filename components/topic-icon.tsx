import type { Topic } from '@/lib/sheets'

const icons: Record<Topic, React.FC<{ className?: string }>> = {
  'Number Theory': ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Three dots — prime counting */}
      <circle cx="20" cy="10" r="2.5" fill="#0A0A0A" />
      <circle cx="20" cy="20" r="2.5" fill="#0A0A0A" />
      <circle cx="20" cy="30" r="2.5" fill="#0A0A0A" />
      <line x1="20" y1="12.5" x2="20" y2="17.5" stroke="#0A0A0A" strokeWidth="0.75" opacity="0.4" />
      <line x1="20" y1="22.5" x2="20" y2="27.5" stroke="#0A0A0A" strokeWidth="0.75" opacity="0.4" />
    </svg>
  ),
  'Algebra': ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Parabola */}
      <path d="M 6,34 Q 20,4 34,34" stroke="#0A0A0A" strokeWidth="1.5" fill="none" />
      {/* Axis */}
      <line x1="20" y1="6" x2="20" y2="36" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.35" strokeDasharray="3,3" />
    </svg>
  ),
  'Geometry': ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Triangle */}
      <polygon points="20,6 5,34 35,34" stroke="#0A0A0A" strokeWidth="1.5" fill="none" />
      {/* Altitude */}
      <line x1="20" y1="6" x2="20" y2="34" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.3" strokeDasharray="3,3" />
      {/* Perpendicular mark */}
      <rect x="20" y="28" width="6" height="6" stroke="#0A0A0A" strokeWidth="0.75" fill="none" opacity="0.5" />
    </svg>
  ),
  'Combinatorics': ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Pascal's triangle dots */}
      <circle cx="20" cy="8"  r="2.5" fill="#0A0A0A" />
      <circle cx="13" cy="20" r="2.5" fill="#0A0A0A" />
      <circle cx="27" cy="20" r="2.5" fill="#0A0A0A" />
      <circle cx="7"  cy="32" r="2.5" fill="#0A0A0A" />
      <circle cx="20" cy="32" r="2.5" fill="#0A0A0A" />
      <circle cx="33" cy="32" r="2.5" fill="#0A0A0A" />
      {/* Lines */}
      <line x1="20" y1="10.5" x2="13" y2="17.5" stroke="#0A0A0A" strokeWidth="0.6" opacity="0.35" />
      <line x1="20" y1="10.5" x2="27" y2="17.5" stroke="#0A0A0A" strokeWidth="0.6" opacity="0.35" />
      <line x1="13" y1="22.5" x2="7"  y2="29.5" stroke="#0A0A0A" strokeWidth="0.6" opacity="0.35" />
      <line x1="13" y1="22.5" x2="20" y2="29.5" stroke="#0A0A0A" strokeWidth="0.6" opacity="0.35" />
      <line x1="27" y1="22.5" x2="20" y2="29.5" stroke="#0A0A0A" strokeWidth="0.6" opacity="0.35" />
      <line x1="27" y1="22.5" x2="33" y2="29.5" stroke="#0A0A0A" strokeWidth="0.6" opacity="0.35" />
    </svg>
  ),
  'Logic': ({ className }) => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden>
      {/* Venn diagram */}
      <circle cx="15" cy="20" r="11" stroke="#0A0A0A" strokeWidth="1.25" fill="none" />
      <circle cx="25" cy="20" r="11" stroke="#0A0A0A" strokeWidth="1.25" fill="none" />
    </svg>
  ),
}

const bgSymbol: Record<Topic, string> = {
  'Number Theory': '∞',
  'Algebra':       'ƒ',
  'Geometry':      '△',
  'Combinatorics': 'C',
  'Logic':         '∴',
}

export function TopicIcon({ topic, className }: { topic: Topic; className?: string }) {
  const Icon = icons[topic]
  return <Icon className={className} />
}

export function TopicBgSymbol({ topic }: { topic: Topic }) {
  return (
    <span className="font-mono select-none pointer-events-none" aria-hidden>
      {bgSymbol[topic]}
    </span>
  )
}
