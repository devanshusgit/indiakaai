import { useState } from 'react'
import Entropy from './components/Entropy'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Technology from './pages/Technology'
import Works from './pages/Works'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './components/Footer'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')

  const sections = {
    home: <Home />,
    technology: <Technology />,
    works: <Works />,
    about: <About />,
    contact: <Contact />,
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="pt-16">
        {sections[activeSection]}
      </main>
      <Footer />
    </div>
  )
}
