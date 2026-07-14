import { useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { LangProvider, useLang } from '../i18n/LangContext'
import Loader from '../components/Loader'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Approach from '../components/Approach'
import Proof from '../components/Proof'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import CaseStudyNudge from '../components/CaseStudyNudge'
import QRLinks from '../components/QRLinks'
import { useNavigate } from 'react-router'

export const meta = () => [
  { title: 'Victor — Builder, Founder & Product Engineer' },
  { name: 'description', content: 'From first idea to real-world usage — I build, ship, and scale products end-to-end. talkr.ai, yomimanga, manju, opus, powerx.' },
  { property: 'og:title', content: 'Victor — Builder, Founder & Product Engineer' },
  { property: 'og:description', content: 'I build products that run in the real world. Not concepts — real systems at scale.' },
  { property: 'og:url', content: 'https://victor-morel.com/' },
]

function UAELeadLocaleSync() {
  const { lang } = useLang()
  useEffect(() => {
    window.UAELead?.setLocale(lang)
  }, [lang])
  return null
}

function HomeContent() {
  const [loaded, setLoaded] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const navigate = useNavigate()

  const handleLoadComplete = useCallback(() => setLoaded(true), [])
  const goToCaseStudy = useCallback(() => navigate('/case/yomimanga'), [navigate])

  return (
    <>
      <UAELeadLocaleSync />
      <div className="noise-overlay" aria-hidden="true" />

      {!loaded && <Loader onComplete={handleLoadComplete} />}

      {loaded && (
        <div className="min-h-screen bg-bg text-primary">
          <Navbar onQRLinks={() => setQrOpen(true)} />
          <main>
            <Hero />
            <Projects onCaseStudy={goToCaseStudy} />
            <About />
            <Approach />
            <Proof />
            <Contact />
          </main>
          <Footer />
          <CaseStudyNudge onOpen={goToCaseStudy} />
        </div>
      )}

      <AnimatePresence>
        {qrOpen && <QRLinks onClose={() => setQrOpen(false)} />}
      </AnimatePresence>
    </>
  )
}

export default function Home() {
  return (
    <LangProvider>
      <HomeContent />
    </LangProvider>
  )
}
