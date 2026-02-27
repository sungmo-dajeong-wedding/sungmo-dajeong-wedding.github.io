export function initKakao(): void {
  const key = import.meta.env.VITE_KAKAO_JS_KEY as string | undefined;

  if (!key) {
    console.warn("VITE_KAKAO_JS_KEY가 설정되어 있지 않습니다.");
    return;
  }

  if (!window.Kakao) {
    console.error("Kakao SDK가 로드되지 않았습니다. index.html의 SDK script를 확인하세요.");
    return;
  }

  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(key);
  }
}