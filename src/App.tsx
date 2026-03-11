import './styles/styles.css'
import { useEffect, useState } from 'react'
import Toast from './components/Toast'
import Intro from './components/Intro'
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Gift from './components/Gift'
import Outro from './components/Outro'
import Guestbook from './components/Guestbook'

function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    // 인트로 중에는 스크롤 잠금
    document.body.style.overflow = showIntro ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [showIntro])

  useEffect(() => {
    if (showIntro) return

    const elements = document.querySelectorAll('.fade-up')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          }
        })
      },
      { threshold: 0.15 }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [showIntro])

  return (
    <>
      {showIntro && <Intro onFinish={() => setShowIntro(false)} />}

      <Hero />
      <Invitation />
      <Calendar />
      <Gallery />
      <Location />
      <Gift setToastMessage={setToastMessage}/>
      <Guestbook />
      <Outro setToastMessage={setToastMessage}/>

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </>
  )
}

export default App