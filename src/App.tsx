import './styles/styles.css'
import { useState } from 'react';
import Toast from './components/Toast';
import Hero from './components/Hero'
import Invitation from './components/Invitation'
import Calendar from './components/Calendar'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Gift from './components/Gift'
import Outro from './components/Outro'

function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  return (
    <>
      <Hero />
      <Invitation />
      <Calendar />
      <Gallery />
      <Location />
      <Gift setToastMessage={setToastMessage}/>
      <Outro setToastMessage={setToastMessage}/>

      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </>
  )
}

export default App