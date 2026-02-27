import { useState } from 'react'

interface GiftProps {
  setToastMessage: (msg: string) => void;
}

export default function Gift({ setToastMessage }: GiftProps) {

  const [open, setOpen] = useState<string | null>(null)

  const groomAccounts = [
  {
    name: '신랑 김성모',
    account: '신한은행 110-432-429303',
  },
  {
    name: '신랑 아버지 김홍기',
    account: '하나은행 096-19-11518-7',
  },
  {
    name: '신랑 어머니 이현진',
    account: '국민은행 650701-01-087343',
  },
];

  const brideAccounts = [
  {
    name: '신부 최다정',
    account: '우리은행 1002-758-980122',
  },
  {
    name: '신부 어머니 서희라',
    account: '우리은행 1002-738-982471',
  },
];

  const toggle = (section: string) => {
    setOpen(open === section ? null : section)
  }

  const copy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setToastMessage('계좌번호가 복사되었습니다.');
  };

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
              {groomAccounts.map((item, index) => (
                <div className="gift__item" key={index}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.account}</p>
                  </div>
                  <button onClick={() => copy(item.account)}>
                    복사
                  </button>
                </div>
              ))}
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
              {brideAccounts.map((item, index) => (
                <div className="gift__item" key={index}>
                  <div>
                    <strong>{item.name}</strong>
                    <p>{item.account}</p>
                  </div>
                  <button onClick={() => copy(item.account)}>
                    복사
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
    </section>
  )
}
