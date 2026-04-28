# Point of Math

A minimal black-and-white math resource website for Thai students preparing for SAT, สอวน., PAT1, AMC, and พสวท. competitions.

Built with Next.js 14.2.30 (App Router), TypeScript, Tailwind CSS. Deployed on Vercel.

## Stack

- Next.js 14.2.30 (App Router, webpack — no Turbopack)
- React 18
- TypeScript (strict)
- Tailwind CSS 3
- Inter font via `next/font/google`

## Design — 60:30:10 B&W

| % | Token | Hex | Usage |
|---|-------|-----|-------|
| 60% | `paper` | `#FAFAFA` | Backgrounds, card surfaces |
| 30% | `ink` | `#0A0A0A` | Headings, nav, body text |
| 10% | `muted` | `#6B6B6B` | Secondary text, borders, tags |

No images, no color, no gradients. Border-radius 2px. Hover = underline/border only.

## Local development

> **Note:** Clone this repo to a path with ASCII characters only (e.g. `C:\projects\pom-web`).
> Next.js 14 uses webpack for builds, but if you upgrade to Next.js 15+ and run from a
> path containing non-ASCII characters (Thai, CJK, etc.) Turbopack will panic. On Vercel
> the path is always ASCII so deploys work fine regardless of where you cloned locally.

```bash
git clone https://github.com/Donaldwic/point-of-math.git
cd point-of-math
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## PDF structure

```
public/
├── papers/
│   ├── sat/          # sat-test-4.pdf, sat-test-4-answers.pdf, ...
│   └── posn/         # posn-camp1-collected.pdf
└── sheets/
    └── soawn/        # unit01_integers_divisibility.pdf, ...
```

## Adding a new past paper

1. Drop the PDF into `public/papers/<competition>/your-paper.pdf`
2. Open `lib/papers.ts`, add an entry to the relevant `PaperGroup.papers` array:
   ```ts
   {
     id: 'unique-id',
     title: 'Display title',
     competition: 'SAT',
     downloadUrl: '/papers/sat/your-paper.pdf',
     answersUrl: '/papers/sat/your-paper-answers.pdf', // optional
   }
   ```

## Adding a new sheet

1. Drop the PDF into `public/sheets/soawn/unitNN_slug.pdf`
2. Open `lib/sheets.ts`, add an entry to the `units` array.

## Adding YouTube videos

Edit `app/videos/page.tsx` — replace placeholder cards with `<iframe>` embeds:
```tsx
<iframe
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video title"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="w-full aspect-video"
/>
```

## Deploy to Vercel

Push to GitHub, import in Vercel — framework auto-detected. No extra config needed.

## License

Educational content. Code MIT.
