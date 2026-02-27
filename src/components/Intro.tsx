import { useEffect, useState } from 'react'

type IntroProps = {
  onFinish: () => void
}

const Intro = ({ onFinish }: IntroProps) => {
  const [phase, setPhase] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    const t1 = window.setTimeout(() => setPhase('exit'), 1400)
    const t2 = window.setTimeout(() => onFinish(), 1800)

    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [onFinish])

  return (
    <div className={`intro ${phase === 'exit' ? 'is-exit' : ''}`} role="presentation">
      <div className="intro__inner">
        <h1 className="intro__title">김성모 &amp; 최다정</h1>
        <p className="intro__meta">2026.05.03 · SUN · AM 11:00</p>
      </div>
    </div>
  )
}

export default Intro