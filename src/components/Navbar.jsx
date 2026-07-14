import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link, useLocation } from 'react-router'
import { useLang } from '../i18n/LangContext'

function QRIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4">
      <rect x="3" y="3" width="7" height="7" rx="1" strokeWidth={1.5} />
      <rect x="14" y="3" width="7" height="7" rx="1" strokeWidth={1.5} />
      <rect x="3" y="14" width="7" height="7" rx="1" strokeWidth={1.5} />
      <path strokeLinecap="round" strokeWidth={1.5} d="M14 14h2v2h-2zM18 14h3M14 18v3M18 18h3v3h-3zM18 18v0" />
    </svg>
  )
}

export default function Navbar({ onQRLinks }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isPWA, setIsPWA] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const { lang, toggle, t } = useLang()
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Hash links: same-page anchor when on home, cross-route navigate otherwise
  const hashHref = (hash) => isHome ? hash : `/${hash}`

  const navLinks = [
    { label: t('nav_about'),    to: hashHref('#about') },
    { label: t('nav_projects'), to: hashHref('#projects') },
    { label: t('nav_approach'), to: hashHref('#approach') },
    { label: t('nav_contact'),  to: hashHref('#contact') },
    { label: 'Blog',            to: '/blog' },
  ]

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia('(display-mode: standalone)')
    setIsPWA(mq.matches)
    const handler = (e) => setIsPWA(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const linkClass = "text-sm text-secondary hover:text-primary transition-colors duration-200 tracking-wide"
  const mobileLinkClass = "text-secondary hover:text-primary text-base transition-colors"

  return (
    <>
      {/* Scroll progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-accent z-[60] origin-left"
        style={{ width: progressWidth }}
      />

      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-bg/90 backdrop-blur-md border-b border-border' : 'bg-transparent'
        }`}
      >
        <nav className="section-padding flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="font-mono text-accent text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
            Victor
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className={`${linkClass} ${link.to === '/blog' && location.pathname.startsWith('/blog') ? 'text-accent' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggle}
              className="font-mono text-xs text-muted border border-border px-3 py-2 rounded-sm hover:text-accent hover:border-accent/40 transition-all duration-200 tracking-widest uppercase"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            {isPWA && (
              <button
                onClick={onQRLinks}
                className="flex items-center gap-2 text-xs font-mono text-muted border border-border px-3 py-2 rounded-sm hover:text-accent hover:border-accent/40 transition-all duration-200"
                aria-label="Liens QR"
              >
                <QRIcon />
                Links
              </button>
            )}
            <Link
              to={hashHref('#contact')}
              className="flex items-center gap-2 text-xs font-mono text-accent border border-accent/30 px-4 py-2 rounded-sm hover:bg-accent/10 hover:border-accent/60 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              {t('nav_cta')}
            </Link>
          </div>

          {/* Mobile right */}
          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              className="font-mono text-xs text-muted border border-border px-2.5 py-1.5 rounded-sm hover:text-accent hover:border-accent/40 transition-all duration-200 tracking-widest uppercase"
              aria-label="Switch language"
            >
              {lang === 'en' ? 'FR' : 'EN'}
            </button>
            {isPWA && (
              <button
                onClick={onQRLinks}
                className="flex items-center justify-center w-8 h-8 text-muted hover:text-accent transition-colors"
                aria-label="Liens QR"
              >
                <QRIcon />
              </button>
            )}
            <button
              className="flex flex-col gap-1.5 p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg/95 backdrop-blur-md border-b border-border"
          >
            <ul className="section-padding py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className={mobileLinkClass}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to={hashHref('#contact')}
                  className="flex items-center gap-2 text-sm font-mono text-accent"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
                  {t('nav_cta')}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.header>
    </>
  )
}
