import { Suspense, lazy, useMemo } from 'react'
import { motion } from 'framer-motion'

const Scene = lazy(() => import('./Scene'))

const PHOTO = 'https://media.licdn.com/dms/image/v2/D5603AQGbIK-oMjn6_A/profile-displayphoto-scale_400_400/B56Z2WFhfXKoAg-/0/1776339530087?e=1778112000&v=beta&t=DbX5cvpMbj2Kq5SGd-rtbrE0IxTpVABo7_bcfP47g-Q'

const logoList = [
  { src: '/img/firefox.webp',        alt: 'Mozilla Firefox',  size: 'max-h-10 sm:max-h-14 md:max-h-16 max-w-[140px] md:max-w-[180px]' },
  { src: '/img/total-energies.webp', alt: 'TotalEnergies',    size: 'max-h-14 sm:max-h-18 md:max-h-20 max-w-[180px] md:max-w-[220px]' },
  { src: '/img/marine.webp',         alt: 'Marine Nationale', size: 'max-h-14 sm:max-h-18 md:max-h-20 max-w-[180px] md:max-w-[220px]' },
  { src: '/img/edf.webp',            alt: 'EDF',              size: 'max-h-14 sm:max-h-18 md:max-h-20 max-w-[180px] md:max-w-[220px]' },
]

function ClientLogos() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.1 }}
      className="mt-16 pt-8 border-t border-white/10"
    >
      <p className="font-mono text-white/35 text-[10px] tracking-[0.35em] uppercase mb-7">
        Trusted by
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/10">
        {logoList.map((logo) => (
          <div key={logo.alt} className="flex items-center justify-center p-5 sm:p-8 md:p-10 bg-bg">
            <img
              src={logo.src}
              alt={logo.alt}
              className={`${logo.size} w-auto object-contain grayscale invert opacity-55 hover:opacity-90 transition-opacity duration-300`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const prefersReducedMotion = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  )
  const isMobile = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  )

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Mobile — profile photo as background */}
      <div className="md:hidden absolute inset-0 z-0">
        <img
          src={PHOTO}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none"
        />
        <div className="absolute inset-0 bg-bg/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent to-bg pointer-events-none" />
      </div>

      {/* 3D scene background — desktop */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          {!prefersReducedMotion && <Scene reducedMotion={isMobile} />}
        </Suspense>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-bg/50 to-bg pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding w-full pt-28 pb-16">
        <div className="max-w-6xl grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT — text */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">
                Product · Engineering · Systems
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.05] tracking-tight mb-7"
            >
              <span className="text-primary block">I build systems</span>
              <span className="text-gradient block font-normal">that don't stay</span>
              <span className="text-primary block">as ideas.</span>
            </motion.h1>

            {/* Subline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-secondary text-base md:text-lg max-w-md leading-relaxed mb-10"
            >
              From first idea to real-world usage — I build, ship,
              and scale products end-to-end.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <a
                href="#projects"
                className="group flex items-center gap-3 bg-accent text-bg text-sm font-medium px-6 py-3.5 rounded-sm hover:bg-accent/90 transition-all duration-200"
              >
                Explore my work
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="text-sm text-secondary hover:text-primary border-b border-transparent hover:border-secondary/40 transition-all duration-200 pb-px"
              >
                Get in touch
              </a>
            </motion.div>

          </div>

          {/* RIGHT — photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="hidden md:flex justify-end"
          >
            <div className="relative">
              {/* Glow behind photo */}
              <div className="absolute inset-0 scale-110 bg-accent/10 blur-[60px] rounded-full pointer-events-none" />

              {/* Photo frame */}
              <div className="relative w-72 lg:w-80 xl:w-96 aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={PHOTO}
                  alt="Victor"
                  className="w-full h-full object-cover object-top"
                  loading="eager"
                />
                {/* Subtle vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent pointer-events-none" />
                {/* Accent border */}
                <div className="absolute inset-0 border border-accent/20 rounded-sm pointer-events-none" />
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -bottom-4 -left-4 bg-surface border border-border px-4 py-3 rounded-sm backdrop-blur-sm"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-widest">Status</p>
                    <p className="text-primary text-xs font-medium mt-0.5">Available for projects</p>
                  </div>
                </div>
              </motion.div>

              {/* Projects count badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -top-4 -right-4 bg-surface border border-border px-4 py-3 rounded-sm backdrop-blur-sm"
              >
                <div className="text-center">
                  <p className="text-accent font-mono text-xl font-light leading-none">5M+</p>
                  <p className="font-mono text-[10px] text-muted uppercase tracking-widest mt-1">Daily requests</p>
                  <p className="font-mono text-[9px] text-muted/60 uppercase tracking-widest mt-0.5">served in production</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>

        {/* Clients — full width strip below the grid */}
        <div className="max-w-6xl mt-12">
          <ClientLogos />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 md:right-12 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent"
        />
      </motion.div>
    </section>
  )
}

