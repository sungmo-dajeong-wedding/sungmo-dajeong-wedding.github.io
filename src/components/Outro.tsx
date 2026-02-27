import outroWebp from '../assets/background/outro-2000.webp';
import outroAvif from '../assets/background/outro-2000.avif';

interface OutroProps {
  setToastMessage: (msg: string) => void;
}

export default function Outro({ setToastMessage }: OutroProps) {

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setToastMessage('링크가 복사되었습니다.');
  };

  return (
    <section id="outro">
      <picture className="outro__bg">
        <source srcSet={outroAvif} type="image/avif" />
        <source srcSet={outroWebp} type="image/webp" />
        <img src={outroWebp} alt="웨딩 배경" />
      </picture>

      <div className="outro__overlay">
        <div className="outro__content">
          <p className="outro__message">
            저희가 걸어온 길에<br />
            잠시라도 함께해 주신<br />
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
