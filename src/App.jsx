import { useState, useCallback, useEffect } from 'react'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Projects from './components/Projects'
import Approach from './components/Approach'
import Proof from './components/Proof'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CaseStudyYomimanga from './components/CaseStudyYomimanga'
import CaseStudyNudge from './components/CaseStudyNudge'

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [page, setPage] = useState('home')

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  const goToCaseStudy = useCallback(() => {
    setPage('case-study-yomimanga')
    window.scrollTo(0, 0)
  }, [])

  const goHome = useCallback(() => {
    setPage('home')
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      {/* Grain noise overlay for premium texture */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Loading screen */}
      {!loaded && <Loader onComplete={handleLoadComplete} />}

      {/* Case study */}
      {loaded && page === 'case-study-yomimanga' && (
        <CaseStudyYomimanga onBack={goHome} />
      )}

      {/* Main site */}
      {loaded && page === 'home' && (
        <div className="min-h-screen bg-bg text-primary">
          <Navbar />
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
    </>
  )
}
