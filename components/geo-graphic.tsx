// Triangle ABC inscribed in circumcircle, with incircle, altitude, and medians.
// A=(230,48) B=(60,370) C=(400,370) circumcenter=(230,254) r≈206 incenter=(230,267) inr≈102

export default function GeoGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Outer decorative ring */}
      <circle cx="230" cy="254" r="224" stroke="#0A0A0A" strokeWidth="0.4" opacity="0.06" />

      {/* Circumcircle */}
      <circle cx="230" cy="254" r="206" stroke="#0A0A0A" strokeWidth="0.9" opacity="0.22" />

      {/* Incircle */}
      <circle cx="230" cy="267" r="102" stroke="#0A0A0A" strokeWidth="0.7" opacity="0.15" />

      {/* Medians (very faint dashed) */}
      {/* B → midpoint AC = (315,209) */}
      <line x1="60" y1="370" x2="315" y2="209" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6" />
      {/* C → midpoint AB = (145,209) */}
      <line x1="400" y1="370" x2="145" y2="209" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.1" strokeDasharray="4 6" />

      {/* Altitude A → foot on BC (vertical) */}
      <line x1="230" y1="48" x2="230" y2="370" stroke="#0A0A0A" strokeWidth="0.5" opacity="0.16" strokeDasharray="5 7" />

      {/* Perpendicular mark at foot of altitude */}
      <rect x="222" y="357" width="16" height="16" stroke="#0A0A0A" strokeWidth="0.8" fill="none" opacity="0.32" />

      {/* Isoceles tick marks on AB and AC */}
      {/* Tick on AB at midpoint (145,209), perpendicular direction (0.887, 0.468) */}
      <line x1="140" y1="207" x2="150" y2="211" stroke="#0A0A0A" strokeWidth="1" opacity="0.35" />
      {/* Tick on AC at midpoint (315,209), perpendicular direction (0.887,-0.468) */}
      <line x1="310" y1="211" x2="320" y2="207" stroke="#0A0A0A" strokeWidth="1" opacity="0.35" />

      {/* Main triangle */}
      <polygon
        points="230,48 60,370 400,370"
        stroke="#0A0A0A"
        strokeWidth="1.4"
        fill="none"
        opacity="0.55"
      />

      {/* Angle arc at A */}
      <path d="M 217,73 A 28,28 0 0,0 243,73" stroke="#0A0A0A" strokeWidth="0.8" fill="none" opacity="0.4" />

      {/* Angle arc at B */}
      <path d="M 69,352 A 22,22 0 0,0 82,370" stroke="#0A0A0A" strokeWidth="0.8" fill="none" opacity="0.32" />

      {/* Angle arc at C */}
      <path d="M 378,370 A 22,22 0 0,0 391,352" stroke="#0A0A0A" strokeWidth="0.8" fill="none" opacity="0.32" />

      {/* Vertex dots */}
      <circle cx="230" cy="48"  r="3.5" fill="#0A0A0A" opacity="0.5" />
      <circle cx="60"  cy="370" r="3.5" fill="#0A0A0A" opacity="0.5" />
      <circle cx="400" cy="370" r="3.5" fill="#0A0A0A" opacity="0.5" />

      {/* Circumcenter O */}
      <circle cx="230" cy="254" r="3"   fill="#0A0A0A" opacity="0.28" />
      {/* Incenter I */}
      <circle cx="230" cy="267" r="2.2" fill="#0A0A0A" opacity="0.2" />

      {/* Vertex labels */}
      <text x="237" y="44"  fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fill="#0A0A0A" opacity="0.45">A</text>
      <text x="40"  y="392" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fill="#0A0A0A" opacity="0.45">B</text>
      <text x="409" y="392" fontSize="13" fontStyle="italic" fontFamily="Georgia, serif" fill="#0A0A0A" opacity="0.45">C</text>

      {/* O and I labels */}
      <text x="214" y="251" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif" fill="#0A0A0A" opacity="0.28">O</text>
      <text x="215" y="279" fontSize="10" fontStyle="italic" fontFamily="Georgia, serif" fill="#0A0A0A" opacity="0.22">I</text>
    </svg>
  )
}
