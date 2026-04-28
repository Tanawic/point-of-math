const faqs = [
  {
    q: 'ดาวน์โหลดได้เลยหรือต้องสมัครสมาชิก?',
    a: 'ดาวน์โหลดได้เลย ไม่ต้องสมัคร ไม่มีค่าใช้จ่าย กดปุ่ม Download แล้ว PDF เปิดขึ้นทันที ฟรีตลอดไป',
  },
  {
    q: 'เริ่มจากชุดไหนดีถ้าเพิ่งเริ่ม?',
    a: 'แนะนำ SAT Math ก่อน ระดับปานกลาง เหมาะ ม.4-6 ที่ยังไม่เคยลองข้อสอบแข่งขัน เมื่อคุ้นชินแล้วขยับไปสอวน. ซึ่งยากขึ้นมาก',
  },
  {
    q: 'SAT กับ สอวน. ต่างกันอย่างไร?',
    a: 'SAT เป็นข้อสอบเข้ามหาวิทยาลัยสหรัฐฯ เน้นการคำนวณและเหตุผล ส่วน สอวน. เป็นโอลิมปิกระดับชาติ ต้องใช้ทักษะการพิสูจน์และคิดเชิงระบบ ยากกว่ามาก',
  },
  {
    q: 'แบบฝึกหัด สอวน. เหมาะกับใคร?',
    a: 'นักเรียน ม.4-6 ที่ต้องการสมัครคัดเลือกค่ายสอวน. หรือชอบโจทย์โอลิมปิก แบ่ง 5 สาขา ทฤษฎีจำนวน พีชคณิต เรขาคณิต การนับ และตรรกศาสตร์',
  },
  {
    q: 'มีเฉลยไหม?',
    a: 'SAT ทุกชุดมีเฉลยดาวน์โหลดแยก แบบฝึกหัดสอวน. เฉลยอยู่ระหว่างจัดทำ จะอัปเดตในช่วงปิดเทอม',
  },
  {
    q: 'จะมีเนื้อหาใหม่เมื่อไหร่?',
    a: 'ช่วงปิดเทอม — คลิปวิดีโออธิบาย เฉลย PAT1 AMC และแบบฝึกหัดเพิ่มเติม ติดตามที่ YouTube channel',
  },
]

export default function FAQ() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-20">
        <div className="grid md:grid-cols-[280px_1fr] gap-12 md:gap-20">

          {/* Sidebar label */}
          <div className="md:pt-1">
            <div className="font-mono text-[11px] uppercase tracking-widest text-muted">FAQ</div>
            <h2 className="mt-4 font-serif italic text-[32px] md:text-[40px] leading-tight text-ink">
              คำถาม<br />ที่พบบ่อย
            </h2>
            <p className="mt-4 font-sans text-[14px] text-muted leading-relaxed">
              ไม่เจอคำตอบ?{' '}
              <a href="mailto:05351@pccm.ac.th" className="text-ink underline underline-offset-4">
                อีเมลมาได้เลย
              </a>
            </p>
          </div>

          {/* Accordion */}
          <div className="flex flex-col">
            {faqs.map((item, i) => (
              <details key={i} className="group border-b border-rule last:border-b-0">
                <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none select-none">
                  <span className="font-sans text-[15px] font-medium text-ink leading-snug pr-4">
                    {item.q}
                  </span>
                  <span className="shrink-0 w-7 h-7 border border-rule flex items-center justify-center group-open:bg-ink group-open:border-ink transition-all duration-200">
                    <span className="font-mono text-[16px] text-ink group-open:text-paper leading-none inline-block group-open:rotate-45 transition-transform duration-200">
                      +
                    </span>
                  </span>
                </summary>
                <div>
                  <p className="font-sans pb-6 text-[14px] leading-[1.75] text-muted pr-12">
                    {item.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
