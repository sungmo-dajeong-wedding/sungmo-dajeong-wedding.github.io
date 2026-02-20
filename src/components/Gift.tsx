import { useState } from 'react'

export default function Gift() {
  const [open, setOpen] = useState<string | null>(null)

  const toggle = (section: string) => {
    setOpen(open === section ? null : section)
  }

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('계좌번호가 복사되었습니다.')
  }

  return (
    <section id="gift">
      <div className="gift__inner">
        <div className="gift__heart">🤍</div>
        <h2 className="gift__title">마음 전하실 곳</h2>

        <p className="gift__desc">
          저희 두 사람의 소중한 시작을<br />
          축하해주시는 모든 분들께 감사드립니다.<br /><br />
          따뜻한 진심을 간직하며<br />
          행복하게 잘 살겠습니다.
        </p>

        {/* 신랑측 */}
        <div className={`gift__accordion ${open === 'groom' ? 'active' : ''}`}>
          <button onClick={() => toggle('groom')} className="gift__header">
            🌿 신랑측
          </button>

          {open === 'groom' && (
            <div className="gift__content">
              <div className="gift__item">
                <div>
                  <strong>신랑 김성모</strong>
                  <p>신한은행 1002-000-000000</p>
                </div>
                <button onClick={() => copy('신한은행 1002-000-000000')}>
                  복사
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 신부측 */}
        <div className={`gift__accordion ${open === 'bride' ? 'active' : ''}`}>
          <button onClick={() => toggle('bride')} className="gift__header bride">
            🌸 신부측
          </button>

          {open === 'bride' && (
            <div className="gift__content">
              <div className="gift__item">
                <div>
                  <strong>신부 최다정</strong>
                  <p>토스뱅크 1000-0000-0000</p>
                </div>
                <button onClick={() => copy('토스뱅크 1000-0000-0000')}>
                  복사
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
