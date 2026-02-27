import { shareKakaoFeed } from "../lib/kakaoShare";

type KakaoShareButtonProps = {
  title?: string;
  description?: string;
  imageUrl: string;
  path?: string;
  buttonText?: string;
  className?: string;
};

export default function KakaoShareButton({
  title = "2026.05.03 성모🤍다정 결혼합니다.",
  description = "소중한 분들을 초대합니다.",
  imageUrl,
  path = "/",
  buttonText = "카카오톡으로 공유",
  className,
}: KakaoShareButtonProps) {
  const onClick = () => {
    shareKakaoFeed({
      title,
      description,
      imageUrl,
      path,
      buttonTitle: "청첩장 보기",
    });
  };

  return (
    <button type="button" className={className} onClick={onClick}>
      {buttonText}
    </button>
  );
}