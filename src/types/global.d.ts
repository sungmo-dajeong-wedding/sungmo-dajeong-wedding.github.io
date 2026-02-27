export {};

declare global {
  interface Window {
    Kakao?: any; // 카카오톡 공유 SDK
    kakao?: any; // 카카오 지도 SDK
  }
}