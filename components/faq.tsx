const faqs = [
  {
    q: 'ดาวน์โหลดได้เลยหรือต้องสมัครสมาชิก?',
    a: 'ดาวน์โหลดได้เลย ไม่ต้องสมัคร ไม่มีค่าใช้จ่าย คลิกที่ปุ่ม Download แล้วไฟล์ PDF จะเปิดขึ้นมาทันที ฟรีทั้งหมดและฟรีตลอดไป',
  },
  {
    q: 'เริ่มจากชุดข้อสอบไหนดีถ้าเพิ่งเริ่ม?',
    a: 'แนะนำให้เริ่มจาก SAT Math ก่อน ระดับความยากเหมาะสำหรับ ม.4-6 ที่ยังไม่เคยลองข้อสอบแข่งขัน เมื่อคุ้นชินแล้วจึงขยับไปสอวน.',
  },
  {
    q: 'SAT กับ สอวน. ต่างกันอย่างไร?',
    a: 'SAT เป็นข้อสอบเข้ามหาวิทยาลัยสหรัฐฯ ระดับปานกลาง เน้นการคำนวณและเหตุผล ส่วน สอวน. เป็นโอลิมปิกระดับชาติ ยากกว่ามาก ต้องใช้ทักษะการพิสูจน์และคิดเชิงระบบ',
  },
  {
    q: 'แบบฝึกหัด สอวน. เหมาะกับใคร?',
    a: 'เหมาะสำหรับนักเรียน ม.4-6 ที่ต้องการสมัครคัดเลือกเข้าค่ายสอวน. หรือผู้ที่ชอบโจทย์ระดับโอลิมปิก แบ่งเป็น 5 หัวข้อหลัก: ทฤษฎีจำนวน พีชคณิต เรขาคณิต คณิตคิดเชิงนับ และตรรกศาสตร์',
  },
  {
    q: 'มีเฉลยไหม?',
    a: 'ข้อสอบ SAT มีเฉลยให้ดาวน์โหลดแยกต่างหากทุกชุด ส่วนแบบฝึกหัด สอวน. เฉลยอยู่ระหว่างการจัดทำ จะอัปเดตในช่วงปิดเทอม',
  },
  {
    q: 'จะมีเนื้อหาใหม่เมื่อไหร่?',
    a: 'คอนเทนต์ใหม่จะมาในช่วงปิดเทอม รวมถึงคลิปวิดีโออธิบาย เฉลยข้อสอบ PAT1 AMC และแบบฝึกหัดเพิ่มเติม ติดตามได้ที่ YouTube channel',
  },
]

export default function FAQ() {
  return (
    <section className="border-t border-rule">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 md:gap-20">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-muted">FAQ</div>
            <h2 className="mt-4 text-[28px] md:text-[36px] font-bold leading-tight text-ink uppercase tracking-tight">
              คำถาม<br />ที่พบบ่อย
            </h2>
          </div>

          <div className="flex flex-col">
            {faqs.map((item, i) => (
              <details
                key={i}
                className="group border-b border-rule last:border-b-0"
              >
                <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none">
                  <span className="text-[14px] font-medium text-ink">{item.q}</span>
                  <span className="shrink-0 w-5 h-5 border border-ink flex items-center justify-center text-ink text-[12px] group-open:bg-ink group-open:text-paper transition-colors">
                    +
                  </span>
                </summary>
                <p className="pb-5 text-[14px] leading-relaxed text-muted pr-8">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
