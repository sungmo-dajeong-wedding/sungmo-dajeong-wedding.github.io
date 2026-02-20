export default function Outro() {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    alert('링크가 복사되었습니다.')
  }

  return (
    <section id="outro">
      <div className="outro__overlay">
        <div className="outro__content">
          <p className="outro__message">
            언제나 곁을 따뜻하게 지켜주신<br />
            모든 분들께 감사드립니다.
          </p>

          <div className="outro__divider">
            <span></span>
            🤍
            <span></span>
          </div>

          <p className="outro__names">
            김성모 & 최다정
          </p>

          <div className="outro__buttons">
            <button className="kakao">카카오톡 공유하기</button>
            <button className="link" onClick={copyLink}>
              링크 복사하기
            </button>
          </div>

          <p className="outro__copyright">
            © 2026. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  )
}
