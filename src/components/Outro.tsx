import outroWebp from '../assets/background/outro-2000.webp';
import outroAvif from '../assets/background/outro-2000.avif';
import KakaoShareButton from './KakaoShareButton';
import { RiKakaoTalkFill } from "react-icons/ri";
import { FiLink } from "react-icons/fi";

interface OutroProps {
  setToastMessage: (msg: string) => void;
}

export default function Outro({ setToastMessage }: OutroProps) {

  const copyLink = async () => {
  const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined;
  const url = siteUrl ? `${siteUrl.replace(/\/$/, "")}/invitation/` : window.location.href;

  await navigator.clipboard.writeText(url);
  setToastMessage("링크가 복사되었습니다.");
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
            <KakaoShareButton
              className="text-link"
              title="성모 & 다정, 결혼합니다."
              description="2026.05.03 11시 우리은행 본점"
              imageUrl="https://sungmo-dajeong-wedding.github.io/invitation/assets/5-600-DZJXW0FP.webp"
              path="/"
            >
              <span className="text-link-inner">
                <RiKakaoTalkFill size={18} />
                카카오톡 공유하기
              </span>
            </KakaoShareButton>

            <button className="text-link" onClick={copyLink}>
              <span className="text-link-inner">
                <FiLink size={18} />
                링크 복사하기
              </span>
            </button>
          </div>

          <p className="outro__copyright">
            © 2026 Dajeong · Developed by Dajeong
          </p>
        </div>
      </div>
    </section>
  )
}
