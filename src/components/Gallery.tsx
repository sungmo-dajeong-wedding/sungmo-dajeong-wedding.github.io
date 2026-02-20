import { useState } from 'react';

const images = [
  '/images/gallery/1.jpg',
  '/images/gallery/2.jpg',
  '/images/gallery/3.jpg',
  '/images/gallery/4.jpg',
  '/images/gallery/5.jpg',
  '/images/gallery/6.jpg',
  '/images/gallery/7.jpg',
  '/images/gallery/8.jpg',
];

const Gallery = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  const open = (index: number) => {
    setCurrent(index);
    setIsOpen(true);
  };

  const close = () => setIsOpen(false);

  const prev = () =>
    setCurrent((prev) => (prev - 1 + images.length) % images.length);

  const next = () =>
    setCurrent((prev) => (prev + 1) % images.length);

  // 모바일 스와이프
  let startX = 0;

  const handleTouchStart = (e: React.TouchEvent) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 70) {
      diff > 0 ? next() : prev();
    }
  };

  return (
    <section className="gallery section">
      <div className="gallery__inner">
        <p className="gallery__eyebrow">GALLERY</p>
        <h2 className="gallery__title">우리의 소중한 순간</h2>

        <div className="gallery__grid">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt=""
              onClick={() => open(index)}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {isOpen && (
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
          >
            ‹
          </button>

          <img
            src={images[current]}
            className="gallery__modal-img"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            className="gallery__nav next"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
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
