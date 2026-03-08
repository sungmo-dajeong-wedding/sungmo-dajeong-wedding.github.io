import { shareKakaoFeed } from "../lib/kakaoShare";
import type { ReactNode } from "react";

type KakaoShareButtonProps = {
  title?: string;
  description?: string;
  imageUrl: string;
  path?: string;
  buttonText?: string;
  className?: string;
  children?: ReactNode; 
};

export default function KakaoShareButton({
  title = "2026.05.03 성모🤍다정 결혼합니다.",
  description = "소중한 분들을 초대합니다.",
  imageUrl,
  path = "/",
  className,
  children,
}: KakaoShareButtonProps) {
  const onClick = () => {

    const query = window.location.search; // ?extraInfo=Y
    const sharePath = `${path}${query}`;

    shareKakaoFeed({
      title,
      description,
      imageUrl,
      path: sharePath,
      buttonTitle: "청첩장 보기",
    });
  };

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
}