const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID   = process.env.TELEGRAM_CHAT_ID

export async function notifyOwner(message: string): Promise<void> {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn('[telegram] TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set')
    return
  }
  try {
    await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    })
  } catch (err) {
    console.error('[telegram] failed to send:', err)
  }
}

export function buildPurchaseMessage(params: {
  studentName: string
  studentEmail: string
  courseTitle: string
  amount: number
  currency: string
}): string {
  const { studentName, studentEmail, courseTitle, amount, currency } = params
  const amt = (amount / 100).toFixed(0)
  return (
    `💰 <b>ขายแล้ว!</b>\n\n` +
    `📚 คอร์ส: <b>${courseTitle}</b>\n` +
    `👤 ชื่อ: ${studentName}\n` +
    `📧 อีเมล: <code>${studentEmail}</code>\n` +
    `💵 ยอด: ${amt} ${currency.toUpperCase()}\n\n` +
    `⚡ ระบบส่งอีเมลพร้อมลิงก์คอร์สให้นักเรียนแล้วอัตโนมัติ`
  )
}
