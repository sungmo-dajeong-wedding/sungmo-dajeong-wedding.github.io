import { useMemo, useRef, useState } from 'react';

type ImgSet = {
  thumb: string;
  largeWebp: string;
  largeAvif: string;
};

const Gallery = () => {
  // ✅ 렌더링이 반복돼도 값이 유지되도록 useRef 사용
  const startXRef = useRef(0);

  // ✅ 썸네일(-600.webp) 목록을 기준으로 이미지 세트를 구성
  const images = useMemo<ImgSet[]>(() => {
    const thumbs = Object.values(
      import.meta.glob('/src/assets/gallery/*-600.webp', {
        eager: true,
        import: 'default',
      })
    )
      .map((src) => src as string)
      .sort((a, b) => {
        // ✅ 파일명이 1-600.webp, 2-600.webp 처럼 숫자 기반이면 숫자 정렬
        const na = Number(a.match(/\/(\d+)-600\.webp$/)?.[1]);
        const nb = Number(b.match(/\/(\d+)-600\.webp$/)?.[1]);
        if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
        return a.localeCompare(b);
      });

    return thumbs.map((thumb) => {
      const largeWebp = thumb.replace('-600.webp', '-2000.webp');
      const largeAvif = thumb.replace('-600.webp', '-2000.avif');
      return { thumb, largeWebp, largeAvif };
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const open = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);
  const next = () => setCurrent((p) => (p + 1) % images.length);

  const handleTouchStart = (e: React.TouchEvent) => {
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startXRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 70) diff > 0 ? next() : prev();
  };

  const currentImg = images[current];

  return (
    <section className="gallery section">
      <div className="gallery__inner">
        <p className="gallery__eyebrow">GALLERY</p>
        <h2 className="gallery__title">우리의 소중한 순간</h2>

        <div className="gallery__grid">
          {images.map((img, index) => (
            <img
              key={img.thumb}
              src={img.thumb}
              alt={`갤러리 이미지 ${index + 1}`}
              onClick={() => open(index)}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      </div>

      {isOpen && currentImg && (
        <div
          className="gallery__modal"
          onClick={close}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="gallery__nav prev"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="이전 사진"
          >
            ‹
          </button>

          {/* ✅ AVIF 지원 브라우저는 AVIF, 아니면 WebP로 자동 폴백 */}
          <picture onClick={(e) => e.stopPropagation()}>
            <source srcSet={currentImg.largeAvif} type="image/avif" />
            <source srcSet={currentImg.largeWebp} type="image/webp" />
            <img
              src={currentImg.largeWebp}
              className="gallery__modal-img"
              alt={`갤러리 크게보기 ${current + 1}`}
              loading="eager"
              decoding="async"
            />
          </picture>

          <button
            className="gallery__nav next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label="다음 사진"
          >
            ›
          </button>

          <div className="gallery__indicator">
            {current + 1} / {images.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;