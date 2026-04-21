import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Approach', href: '#approach' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
          scrolled
            ? 'bg-bg/90 backdrop-blur-md border-b border-border'
            : 'bg-transparent'
        }`}
      >
        <nav className="section-padding flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="font-mono text-accent text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
            Victor
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-secondary hover:text-primary transition-colors duration-200 tracking-wide"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            className="hidden md:flex items-center gap-2 text-xs font-mono text-accent border border-accent/30 px-4 py-2 rounded-sm hover:bg-accent/10 hover:border-accent/60 transition-all duration-200"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Selective collaborations
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-px bg-primary transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
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
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-secondary hover:text-primary text-base transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.header>
    </>
  )
}
