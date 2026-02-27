import { useEffect, useRef, useState } from 'react';
import Transport from "./Transport";

const Location = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'place' | 'meal' | 'parking'>('place');

  useEffect(() => {
  const loadMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

    const container = mapRef.current;

    const map = new window.kakao.maps.Map(container, {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 초기값 (서울시청 근처 아무 좌표)
      level: 3,
    });

    // 주소-좌표 변환 객체 생성
    const geocoder = new window.kakao.maps.services.Geocoder();

    geocoder.addressSearch(
      "서울 중구 소공로 51 우리은행 본점",
      (result: any, status: any) => {
        if (status === window.kakao.maps.services.Status.OK) {
          const coords = new window.kakao.maps.LatLng(
            result[0].y,
            result[0].x
          );

          // 지도 중심 이동
          map.setCenter(coords);

          // 마커 생성
          const marker = new window.kakao.maps.Marker({
            map: map,
            position: coords,
          });
        }
      }
    );
  };

  if (window.kakao && window.kakao.maps) {
    loadMap();
    return;
  }

  const script = document.createElement("script");
  const key = import.meta.env.VITE_KAKAO_MAP_KEY;

  // services 라이브러리 추가해야 Geocoder 사용 가능
  script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false&libraries=services`;
  script.async = true;

  script.onload = () => {
    window.kakao.maps.load(() => {
      loadMap();
    });
  };

  document.head.appendChild(script);
}, []);

  return (
    <section className="location section" id="location">
      <div className="location__inner">
        <header className="section-header">
          <p className="section-header__eyebrow">LOCATION</p>
          <h2 className="section-header__title">오시는 길</h2>
        </header>

        <p className="location__address">
          서울 중구 소공로 51 우리은행 본점 4층
        </p>

        <div
          ref={mapRef}
          className="location__map"
        />

        {/* 네비 버튼 */}
        <div className="location__nav">
          <a href="https://map.naver.com/p/search/우리은행본점/place/12127345" target="_blank">네이버지도</a>
          <a href="https://place.map.kakao.com/1310395223" target="_blank">카카오맵</a>
          <a href="https://tmap.life/f8d8d928" target="_blank">티맵</a>
        </div>

        {/* 길 정보 */}
        <Transport />

        {/* 탭 버튼 */}
        <div className="location__tabs">
          <button
            className={activeTab === 'place' ? 'active' : ''}
            onClick={() => setActiveTab('place')}
          >
            장소안내
          </button>

          <button
            className={activeTab === 'meal' ? 'active' : ''}
            onClick={() => setActiveTab('meal')}
          >
            식사안내
          </button>

          <button
            className={activeTab === 'parking' ? 'active' : ''}
            onClick={() => setActiveTab('parking')}
          >
            주차안내
          </button>
        </div>

        {/* 탭 내용 */}
        <div className="location__content">
          {activeTab === 'place' && (
            <ul>
              <li>본식은 <mark>우리은행 본점 4층 웨딩홀</mark>에서 진행됩니다.</li>
              <li>신부대기실은 엘리베이터 우측에 있습니다.</li>
            </ul>
          )}

          {activeTab === 'meal' && (
            <ul>
              <li>피로연장은 <mark>우리은행 본점 7층</mark>입니다.</li>
              <li>이용시간: 11:30 ~ 13:00</li>
            </ul>
          )}

          {activeTab === 'parking' && (
            <ul>
              <li>우리은행 본점 B2 ~ B3층 주차 가능합니다.</li>
              <li>L층 로비에서 차량 등록 가능, <mark>당일 종일 무료 주차</mark></li>
            </ul>
          )}
        </div>

      </div>
    </section>
  );
};

export default Location;
