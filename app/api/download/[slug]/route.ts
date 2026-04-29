import { NextRequest, NextResponse } from 'next/server'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { sheets } from '@/lib/sheets'
import type { Topic } from '@/lib/sheets'
import fs from 'fs'
import path from 'path'

export const runtime = 'nodejs'

const INK  = rgb(10 / 255, 10 / 255, 10 / 255)
const MUTED = rgb(140 / 255, 130 / 255, 118 / 255)
const WHITE = rgb(1, 1, 1)
const PAPER = rgb(238 / 255, 235 / 255, 230 / 255) // #EEEBE6

// ─── Word wrap ───────────────────────────────────────────────────────────────
function wrapText(
  text: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  size: number,
  maxWidth: number,
): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

// ─── Background geometric art per topic ──────────────────────────────────────
function drawTopicArt(page: ReturnType<PDFDocument['addPage']>, topic: Topic, W: number, H: number) {
  const cx = W * 0.72
  const cy = H * 0.42
  const op = 0.055

  if (topic === 'Number Theory') {
    // Three vertically-stacked dots connected by lines
    const r = 18
    const gap = 60
    for (let i = 0; i < 3; i++) {
      const y = cy + gap - i * gap
      page.drawCircle({ x: cx, y, size: r, color: INK, opacity: op })
    }
    page.drawLine({ start: { x: cx, y: cy + gap - r }, end: { x: cx, y: cy - r }, thickness: 6, color: INK, opacity: op })
    page.drawLine({ start: { x: cx, y: cy - r }, end: { x: cx, y: cy - gap + r }, thickness: 6, color: INK, opacity: op })

  } else if (topic === 'Algebra') {
    // Parabola: Q bezier scaled up
    page.drawSvgPath('M -110,120 Q 0,-90 110,120', {
      x: cx, y: cy,
      borderColor: INK, borderWidth: 10,
      opacity: op,
    })
    // Dashed axis — drawn as short lines
    for (let seg = 0; seg < 6; seg++) {
      const yStart = cy - 100 + seg * 40
      page.drawLine({ start: { x: cx, y: yStart }, end: { x: cx, y: yStart + 20 }, thickness: 3, color: INK, opacity: op * 0.5 })
    }

  } else if (topic === 'Geometry') {
    // Triangle + altitude + right-angle mark
    const h = 150
    page.drawSvgPath(`M 0,${h} L ${-h},${-h} L ${h},${-h} Z`, {
      x: cx, y: cy,
      borderColor: INK, borderWidth: 8,
      opacity: op,
    })
    page.drawLine({ start: { x: cx, y: cy + h }, end: { x: cx, y: cy - h }, thickness: 3, color: INK, opacity: op * 0.5 })
    // Right-angle mark at base
    const ms = 18
    page.drawRectangle({ x: cx, y: cy - h, width: ms, height: ms, borderColor: INK, borderWidth: 3, opacity: op * 0.6 })

  } else if (topic === 'Combinatorics') {
    // Pascal's triangle — 6 dots
    const r = 12
    const pts = [
      { x: 0, y: 90 },
      { x: -42, y: 20 }, { x: 42, y: 20 },
      { x: -84, y: -50 }, { x: 0, y: -50 }, { x: 84, y: -50 },
    ]
    pts.forEach(p => page.drawCircle({ x: cx + p.x, y: cy + p.y, size: r, color: INK, opacity: op }))
    const edges = [[0,1],[0,2],[1,3],[1,4],[2,4],[2,5]]
    edges.forEach(([a, b]) => page.drawLine({
      start: { x: cx + pts[a].x, y: cy + pts[a].y },
      end:   { x: cx + pts[b].x, y: cy + pts[b].y },
      thickness: 3, color: INK, opacity: op * 0.55,
    }))

  } else if (topic === 'Logic') {
    // Two overlapping circles (Venn diagram)
    const r = 95
    const offset = 55
    page.drawSvgPath(
      `M ${-offset + r},0 A ${r},${r} 0 1,0 ${-offset - r},0 A ${r},${r} 0 1,0 ${-offset + r},0 Z`,
      { x: cx, y: cy, borderColor: INK, borderWidth: 7, opacity: op },
    )
    page.drawSvgPath(
      `M ${offset + r},0 A ${r},${r} 0 1,0 ${offset - r},0 A ${r},${r} 0 1,0 ${offset + r},0 Z`,
      { x: cx, y: cy, borderColor: INK, borderWidth: 7, opacity: op },
    )
  }
}

// ─── Build cover PDF ──────────────────────────────────────────────────────────
async function buildCover(
  doc: PDFDocument,
  unit: number,
  title: string,
  topic: Topic,
  difficulty: string,
): Promise<void> {
  const page = doc.addPage([595.28, 841.89]) // A4
  const { width: W, height: H } = page.getSize()

  const bold     = await doc.embedFont(StandardFonts.HelveticaBold)
  const regular  = await doc.embedFont(StandardFonts.Helvetica)
  const oblique  = await doc.embedFont(StandardFonts.HelveticaOblique)

  const M = 60 // left/right margin

  // ── Top bar ────────────────────────────────────────────────────────────────
  const barH = 72
  page.drawRectangle({ x: 0, y: H - barH, width: W, height: barH, color: INK })

  page.drawText('Point of Math', {
    x: M, y: H - 44,
    font: oblique, size: 17,
    color: WHITE,
  })

  // ── Background art ─────────────────────────────────────────────────────────
  drawTopicArt(page, topic, W, H)

  // ── Unit number ────────────────────────────────────────────────────────────
  const unitLabel = unit.toString().padStart(2, '0')
  page.drawText(unitLabel, {
    x: M, y: H - 220,
    font: bold, size: 130,
    color: INK,
  })

  // ── Topic label ────────────────────────────────────────────────────────────
  // Topic label — space out letters manually by splitting
  const topicStr = topic.toUpperCase().split('').join('  ')
  page.drawText(topicStr, {
    x: M, y: H - 268,
    font: bold, size: 10,
    color: MUTED,
  })

  // ── Divider ────────────────────────────────────────────────────────────────
  page.drawLine({
    start: { x: M, y: H - 284 }, end: { x: W - M, y: H - 284 },
    thickness: 0.6, color: MUTED,
  })

  // ── Title (word-wrapped) ───────────────────────────────────────────────────
  const titleSize = 40
  const titleLines = wrapText(title, bold, titleSize, W - M - 180)
  titleLines.forEach((line, i) => {
    page.drawText(line, {
      x: M, y: H - 340 - i * (titleSize + 8),
      font: bold, size: titleSize,
      color: INK,
    })
  })

  // ── Level + difficulty badge ───────────────────────────────────────────────
  const badgeY = H - 340 - titleLines.length * (titleSize + 8) - 12
  page.drawText(`SOAWN.  ·  ${difficulty.toUpperCase()}`, {
    x: M, y: badgeY,
    font: regular, size: 10,
    color: MUTED,
  })

  // ── Paper band ─────────────────────────────────────────────────────────────
  const bandH = 30
  page.drawRectangle({ x: 0, y: 0, width: W, height: bandH, color: PAPER })
  page.drawLine({
    start: { x: 0, y: bandH }, end: { x: W, y: bandH },
    thickness: 0.4, color: MUTED,
  })

  page.drawText('point-of-math.vercel.app', {
    x: M, y: 10,
    font: regular, size: 8.5,
    color: MUTED,
  })

  const rightLabel = 'Free Practice Sheet'
  const rightLabelW = regular.widthOfTextAtSize(rightLabel, 8.5)
  page.drawText(rightLabel, {
    x: W - M - rightLabelW, y: 10,
    font: regular, size: 8.5,
    color: MUTED,
  })
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } },
) {
  const sheet = sheets.find((s) => s.slug === params.slug)
  if (!sheet) return new NextResponse('Not found', { status: 404 })

  // Build cover
  const coverDoc = await PDFDocument.create()
  await buildCover(coverDoc, sheet.unit, sheet.title, sheet.topic, sheet.difficulty)
  const coverBytes = await coverDoc.save()

  // Try to load original PDF from /public
  const pdfPath = path.join(process.cwd(), 'public', sheet.downloadUrl)
  const pdfExists = fs.existsSync(pdfPath)

  let pdfBytes: Uint8Array

  if (pdfExists) {
    const originalBytes = fs.readFileSync(pdfPath)
    const finalDoc = await PDFDocument.create()

    // Copy cover page
    const coverSrc = await PDFDocument.load(coverBytes)
    const [coverPage] = await finalDoc.copyPages(coverSrc, [0])
    finalDoc.addPage(coverPage)

    // Copy original pages
    const origDoc = await PDFDocument.load(originalBytes)
    const count = origDoc.getPageCount()
    const origPages = await finalDoc.copyPages(origDoc, Array.from({ length: count }, (_, i) => i))
    origPages.forEach((p) => finalDoc.addPage(p))

    pdfBytes = await finalDoc.save()
  } else {
    // Serve cover-only if content PDF doesn't exist yet
    pdfBytes = coverBytes
  }

  const filename = `unit${sheet.unit.toString().padStart(2, '0')}_${sheet.slug}.pdf`

  return new NextResponse(pdfBytes.buffer as ArrayBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
