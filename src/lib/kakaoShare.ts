type KakaoFeedShareParams = {
  title: string;
  description: string;
  imageUrl: string;
  path?: string;
  buttonTitle?: string;
};

function buildShareUrl(path: string = "/"): string {
  const siteUrl = import.meta.env.VITE_SITE_URL as string | undefined;

  if (!siteUrl) {
    console.warn("VITE_SITE_URL이 없습니다. .env에 VITE_SITE_URL을 설정하세요.");
    return window.location.href; // fallback
  }

  const normalizedSite = siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl;
  const base = "/invitation";
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (normalizedPath === "/") {
    return `${normalizedSite}${base}/`;
  }
  return `${normalizedSite}${base}${normalizedPath}`;
}

export function shareKakaoFeed({
  title,
  description,
  imageUrl,
  path = "/",
  buttonTitle = "청첩장 보기",
}: KakaoFeedShareParams): void {
  const kakao = window.Kakao;

  if (!kakao) {
    alert("Kakao SDK가 로드되지 않았습니다. index.html script를 확인하세요.");
    return;
  }

  if (!kakao.isInitialized?.()) {
    alert("Kakao SDK가 초기화되지 않았습니다. VITE_KAKAO_JS_KEY와 도메인 설정을 확인하세요.");
    return;
  }

  const shareUrl = buildShareUrl(path);

  kakao.Share.sendDefault({
    objectType: "feed",
    content: {
      title,
      description,
      imageUrl,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    buttons: [
      {
        title: buttonTitle,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
  });
}