import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

function useTilt(strength = 18) {
  const cardRef = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 })
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 })
  const onMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * strength)
    rawX.set(-((e.clientY - cy) / (rect.height / 2)) * (strength * 0.6))
  }, [rawX, rawY, strength])
  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])
  return { cardRef, rotateX, rotateY, onMouseMove, onMouseLeave }
}
import { projects } from '../data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

function StatusBadge({ status }) {
  const colors = {
    Live: 'text-emerald-400 border-emerald-400/30',
    Beta: 'text-amber-400 border-amber-400/30',
    Stealth: 'text-purple-400 border-purple-400/30',
  }
  return (
    <span className={`font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 rounded-sm ${colors[status] || 'text-muted border-border'}`}>
      {status}
    </span>
  )
}

function BrowserMock({ project, loaded }) {
  return (
    <div
      className="rounded-sm overflow-hidden border border-border"
      style={{ background: `${project.color}06` }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        <div className="flex-1 mx-3 bg-bg rounded-sm px-3 py-1 flex items-center gap-2 min-w-0">
          <svg className="w-3 h-3 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-mono text-[10px] text-muted/70 truncate">
            {project.url.replace('https://', '')}
          </span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-muted hover:text-primary transition-colors flex-shrink-0"
          onClick={e => e.stopPropagation()}
        >
          ↗
        </a>
      </div>

      {/* Viewport */}
      <div className="relative overflow-hidden" style={{ height: '340px' }}>
        {loaded ? (
          <>
            <iframe
              src={project.url}
              title={`${project.name} live preview`}
              className="border-0 pointer-events-none select-none"
              style={{
                width: '166.67%',
                height: '166.67%',
                transform: 'scale(0.6)',
                transformOrigin: 'top left',
              }}
              sandbox="allow-scripts allow-same-origin"
            />
            {/* Hover overlay — click opens the site */}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group absolute inset-0 flex items-center justify-center"
            >
              {/* bg overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${project.color}16` }}
              />
              <span
                className="relative font-mono text-xs px-5 py-2.5 rounded-sm border backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  color: project.color,
                  borderColor: `${project.color}50`,
                  background: `${project.color}18`,
                }}
              >
                Open site ↗
              </span>
            </a>
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3 opacity-20">
              <svg className="w-8 h-8" fill="none" stroke={project.color} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span className="font-mono text-[10px]" style={{ color: project.color }}>Loading…</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ProjectCard({ project, index, onCaseStudy }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(false)
  const isEven = index % 2 === 0

  const { cardRef, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(18)

  return (
    <motion.article
      ref={(el) => { ref.current = el; cardRef.current = el }}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp}
      custom={index}
      itemScope
      itemType="https://schema.org/CreativeWork"
      style={{ rotateX, rotateY, transformPerspective: 1400, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative border border-border hover:border-border-light transition-colors duration-300 rounded-sm overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="h-px w-0 group-hover:w-full transition-all duration-700"
        style={{ background: project.color }}
      />
      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: `radial-gradient(600px at 50% 0%, ${project.color}10, transparent 60%)` }}
      />

      <div className={`relative z-10 grid md:grid-cols-2 ${isEven ? '' : 'md:[direction:rtl]'}`}>

        {/* INFO COLUMN */}
        <div className={`p-8 md:p-10 flex flex-col ${isEven ? '' : 'md:[direction:ltr]'}`}>
          {/* Header + title — iframe background on mobile only */}
          <div className="relative overflow-hidden rounded-sm mb-5 -mx-8 md:mx-0 -mt-8 md:mt-0 px-8 md:px-0 pt-8 md:pt-0 pb-6 md:pb-0">
            {/* Mobile iframe background */}
            {inView && (
              <div className="md:hidden absolute inset-0 pointer-events-none" aria-hidden="true">
                <iframe
                  src={project.url}
                  title=""
                  tabIndex={-1}
                  className="absolute top-0 left-0 border-0 pointer-events-none select-none"
                  style={{
                    width: '166.67%',
                    height: '166.67%',
                    transform: 'scale(0.6)',
                    transformOrigin: 'top left',
                  }}
                  sandbox="allow-scripts allow-same-origin"
                />
                <div className="absolute inset-0 bg-bg/[85%]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg/30 to-bg" />
              </div>
            )}

            {/* Header */}
            <div className="relative flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="font-mono text-muted text-xs">{project.number}</span>
                <span className="font-mono text-xs text-secondary uppercase tracking-widest">{project.category}</span>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={project.status} />
                <span className="font-mono text-muted text-xs">{project.year}</span>
                {project.id === 'yomimanga' && (
                  <span className="font-mono text-[10px] tracking-widest uppercase border px-2 py-0.5 rounded-sm" style={{ color: project.color, borderColor: `${project.color}40` }}>
                    Case study
                  </span>
                )}
              </div>
            </div>

            {/* Title */}
            <h3
              itemProp="name"
              className="relative text-3xl md:text-4xl font-light mb-3 transition-colors duration-300"
              style={{ color: expanded ? project.color : '#F5F0EB' }}
            >
              {project.name}
            </h3>

            {/* Tagline */}
            <p itemProp="description" className="relative text-secondary text-base leading-relaxed max-w-sm">
              {project.tagline}
            </p>
          </div>

          {/* Role */}
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-3.5 h-3.5 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-mono text-xs text-muted">{project.role}</span>
          </div>

          {/* Proof line */}
          {project.proof && (
            <p className="font-mono text-[11px] text-accent/70 mb-5 tracking-wide">{project.proof}</p>
          )}

          {/* Stack */}
          {project.stack && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <span key={tech} className="font-mono text-[11px] px-2.5 py-1 border border-border rounded-sm text-muted hover:text-secondary transition-colors">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Expandable problem/value */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="overflow-hidden mb-6"
              >
                <div className="border-t border-border pt-6 grid gap-4">
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1.5">The Problem</p>
                    <p className="text-secondary text-sm leading-relaxed">{project.problem}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] text-muted uppercase tracking-widest mb-1.5">What It Solves</p>
                    <p className="text-secondary text-sm leading-relaxed">{project.value}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 font-mono text-xs text-muted hover:text-primary transition-colors duration-200"
            >
              <span>{expanded ? 'Less' : 'Details'}</span>
              <motion.svg
                animate={{ rotate: expanded ? 180 : 0 }}
                className="w-3 h-3"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </motion.svg>
            </button>
            <div className="flex items-center gap-4">
              {project.id === 'yomimanga' && onCaseStudy && (
                <button
                  onClick={onCaseStudy}
                  className="flex items-center gap-1.5 text-xs font-mono transition-all duration-200 hover:gap-2.5 opacity-70 hover:opacity-100"
                  style={{ color: project.color }}
                >
                  View case study
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              )}
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono transition-all duration-200 hover:gap-3"
                style={{ color: project.color }}
              >
                Open product
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* PREVIEW COLUMN — desktop only */}
        <div className={`hidden md:flex border-border ${isEven ? 'md:border-l' : 'md:border-r md:[direction:ltr]'} p-5 flex-col justify-center bg-surface/30`}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.05 }}
          >
            <BrowserMock project={project} loaded={inView} />
          </motion.div>
        </div>

      </div>
    </motion.article>
  )
}

export default function Projects({ onCaseStudy }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" ref={ref} className="py-28 section-padding" aria-label="Projects">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <div className="mb-14">
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={0}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">01 / Selected Work</span>
            <motion.div
              className="h-px bg-border flex-1 max-w-xs"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            />
          </motion.div>

          <motion.h2
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
            className="text-3xl md:text-5xl font-light text-primary leading-tight"
          >
            Built, shipped,{' '}
            <span className="text-secondary font-light">and running.</span>
          </motion.h2>

          <motion.p
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={2}
            className="text-secondary mt-6 max-w-xl leading-relaxed"
          >
            Not concepts or experiments — real products, built from scratch
            and running in production.
          </motion.p>
        </div>

        {/* Projects list */}
        <div className="grid gap-4">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} onCaseStudy={onCaseStudy} />
          ))}
        </div>
      </div>
    </section>
  )
}
