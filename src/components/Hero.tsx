import introWebp from '../assets/background/intro-2000.webp'
import introAvif from '../assets/background/intro-2000.avif'

const Hero = () => {
  return (
    <section className="hero">
      <picture className="hero__bg">
        <source srcSet={introAvif} type="image/avif" />
        <source srcSet={introWebp} type="image/webp" />
        <img src={introWebp} alt="웨딩 사진" />
      </picture>

      <div className="hero__overlay">
        <div className="hero__content">
          <p>We’re Getting Married</p>
          <h1>성모 & 다정</h1>
          <p>
            2026.05.03 · SUN · AM 11:00<br />
            우리은행 본점
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero