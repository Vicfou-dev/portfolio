import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, animate } from 'framer-motion'

const COLOR = '#EC4899'

/* ── Animated counter ── */
function Counter({ to, suffix = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, parseFloat(to), {
      duration: 1.8,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate(v) { setDisplay(Math.round(v).toString()) },
    })
    return ctrl.stop
  }, [inView, to])
  return <span ref={ref}>{display}{suffix}</span>
}

/* ── Browser mock ── */
function BrowserMock() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 180, damping: 18, mass: 0.5 })
  const rotateY = useSpring(rawY, { stiffness: 180, damping: 18, mass: 0.5 })
  function onMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * 18)
    rawX.set(-((e.clientY - cy) / (rect.height / 2)) * 11)
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0) }
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ rotateX, rotateY, transformPerspective: 1200, transformStyle: 'preserve-3d', background: `${COLOR}06` }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="rounded-sm overflow-hidden border border-border shadow-2xl cursor-default"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 bg-surface border-b border-border">
        <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        <div className="flex-1 mx-3 bg-bg rounded-sm px-3 py-1 flex items-center gap-2 min-w-0">
          <svg className="w-3 h-3 text-muted flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span className="font-mono text-[10px] text-muted/70 truncate">yomimanga.com</span>
        </div>
        <a href="https://yomimanga.com" target="_blank" rel="noopener noreferrer"
          className="font-mono text-[11px] text-muted hover:text-primary transition-colors flex-shrink-0">↗</a>
      </div>
      <div className="relative overflow-hidden" style={{ height: '400px' }}>
        {inView && (
          <>
            <iframe src="https://yomimanga.com" title="yomimanga live preview"
              className="border-0 pointer-events-none select-none"
              style={{ width: '166.67%', height: '166.67%', transform: 'scale(0.6)', transformOrigin: 'top left' }}
              sandbox="allow-scripts allow-same-origin"
            />
            <a href="https://yomimanga.com" target="_blank" rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
              style={{ background: `${COLOR}16` }}>
              <span className="font-mono text-xs px-5 py-2.5 rounded-sm border backdrop-blur-sm"
                style={{ color: COLOR, borderColor: `${COLOR}50`, background: `${COLOR}18` }}>Open site ↗</span>
            </a>
          </>
        )}
      </div>
    </motion.div>
  )
}

/* ── Image panel ── */
function Panel({ num, label, img, headline, body, quote, list, accent = false }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.7 }}
      className="relative overflow-hidden w-full"
      style={{ minHeight: '540px' }}
    >
      {/* Background image */}
      <img
        src={img}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />
      {/* Overlays */}
      <div className="absolute inset-0 bg-bg/72 pointer-events-none" />
      {/* Top fade — fondu depuis le bg */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
      {/* Bottom fade — fondu vers le bg */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />
      {/* Side vignette */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg/50 via-transparent to-bg/30 pointer-events-none" />

      {/* Content */}
      <div className="relative p-8 md:p-12 h-full flex flex-col justify-between">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="font-mono text-xs tracking-[0.35em] uppercase mb-5 block"
            style={{ color: accent ? COLOR : 'rgba(180,190,200,0.85)' }}>
            {num} / {label}
          </span>
          <h2 className="text-2xl md:text-3xl font-light text-primary leading-snug mb-5 max-w-lg">
            {headline}
          </h2>

          {body && (
            <div className="space-y-3 max-w-lg">
              {body.map((p, i) => (
                <p key={i} className="text-primary/75 text-base leading-relaxed">{p}</p>
              ))}
            </div>
          )}

          {list && (
            <ul className="mt-4 space-y-2 max-w-lg">
              {list.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-primary/75 text-base">
                  <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: COLOR }} />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {quote && (
            <div className="mt-5 border-l-2 pl-5 py-1" style={{ borderColor: COLOR }}>
              <p className="text-primary font-light text-lg leading-relaxed italic">{quote}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  )
}

/* ── Panels data ── */
const panels = [
  {
    num: '01', label: 'Context', img: '/img/cs1.webp', accent: true,
    headline: <>A platform designed for <span style={{ color: COLOR }}>scale from day one.</span></>,
    body: [
      'yomimanga is a manga reading platform built to deliver a fast, seamless experience — even under heavy traffic.',
      'Unlike most platforms in the space, it was designed with performance as the primary constraint, not an afterthought.',
    ],
  },
  {
    num: '02', label: 'The Problem', img: '/img/cs2.webp',
    headline: <>Most manga platforms struggle with <span style={{ color: COLOR }}>performance.</span></>,
    body: [
      'Slow load times, broken reading flows, and infrastructure that collapses under traffic spikes.',
      'Existing platforms were built to serve content — not to handle millions of concurrent requests gracefully.',
    ],
    quote: '"They\'re built like content sites — not high-traffic systems."',
  },
  {
    num: '03', label: 'The Approach', img: '/img/cs3.webp',
    headline: <>I approached this as a <span style={{ color: COLOR }}>systems problem,</span> not a product problem.</>,
    body: [
      'The goal wasn\'t just to display manga — it was to build a platform that could handle millions of requests, stay fast under load, and deliver a reading experience that respects the art.',
      'Every architectural decision was made through one lens: what happens when this gets 10x more traffic?',
    ],
  },
  {
    num: '04', label: 'Architecture', img: '/img/cs4.webp', accent: true,
    headline: <><span style={{ color: COLOR }}>Performance-first,</span> from the ground up.</>,
    body: [
      'Every layer of the stack was chosen and tuned for speed, reliability, and scale. No wasted steps, no default configurations.',
    ],
    list: [
      'PHP backend — optimized for high concurrency',
      'Redis — aggressive caching layer',
      'CDN — static assets served at the edge',
      'Database — every query reviewed and tuned',
    ],
  },
  {
    num: '05', label: 'Scaling', img: '/img/cs5.webp',
    headline: <>Scaling isn't about adding more — it's about <span style={{ color: COLOR }}>removing bottlenecks.</span></>,
    body: [
      'Getting to 5M+ daily requests didn\'t happen at launch. It required continuous optimization cycles driven by real usage data.',
    ],
    list: [
      'Aggressive caching strategies tuned to real request patterns',
      'Database query profiling and index optimization under load',
      'Infrastructure adjustments based on peak traffic analysis',
      'Monitoring and alerting before users notice degradation',
    ],
  },
  {
    num: '06', label: 'Key Decisions', img: '/img/cs6.webp',
    headline: <>The decisions that made the <span style={{ color: COLOR }}>difference.</span></>,
    list: [
      'Prioritize performance over feature complexity at every decision point.',
      'Design for caching from the start — not as an afterthought.',
      'Optimize for real user behavior, not assumptions or benchmarks.',
      'Iterate based on live traffic data, not theory.',
    ],
  },
  {
    num: '07', label: 'What I Learned', img: '/img/cs7.webp',
    headline: <>Building at scale changes how you <span style={{ color: COLOR }}>think about systems.</span></>,
    body: [
      'yomimanga reinforced one core idea: performance is a product decision, not a technical afterthought.',
      'Building and maintaining a system at this scale solo meant learning to make decisions with incomplete information, prioritize ruthlessly, and optimize based on real signals rather than assumptions.',
    ],
    quote: '"Real-world systems don\'t break because of missing features — they break because they weren\'t designed for usage."',
  },
]

const results = [
  { raw: '5', suffix: 'M+', label: 'Daily requests',      sub: 'Handled in production' },
  { raw: '100', suffix: '%', label: 'Uptime maintained',  sub: 'Under peak traffic' },
  { raw: '1',   suffix: '',  label: 'Engineer',           sub: 'Built and maintained end-to-end' },
]

export default function CaseStudyYomimanga({ onBack }) {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-screen bg-bg text-primary">

      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-md border-b border-border">
        <div className="section-padding flex items-center justify-between h-16 max-w-6xl mx-auto">
          <button onClick={onBack}
            className="flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors duration-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            Back to portfolio
          </button>
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">Case Study</span>
          <a href="https://yomimanga.com" target="_blank" rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 font-mono text-xs text-accent border border-accent/30 px-3 py-1.5 rounded-sm hover:bg-accent/10 transition-all duration-200">
            Open live ↗
          </a>
        </div>
      </header>

      <main className="pt-16">

        {/* ── Hero ── */}
        <section className="section-padding py-20 border-b border-border overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-12"
            >
              <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: COLOR }}>
                Media · High-Traffic Platform
              </span>
              <span className="font-mono text-muted text-xs">2025</span>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
              <div>
                <motion.h1
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 }}
                  className="text-7xl md:text-9xl font-light leading-none tracking-tight mb-8"
                  style={{ color: COLOR }}
                >
                  yomi<br />manga
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  className="text-xl md:text-2xl text-secondary font-light leading-snug mb-6"
                >
                  Serving 5M+ manga reads daily.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.45 }}
                  className="text-secondary leading-relaxed mb-8 max-w-sm"
                >
                  Built from scratch — designed to handle real traffic at scale.
                  Not a content site. A high-traffic system built with performance as the primary constraint.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.55 }}
                  className="flex flex-wrap gap-2 mb-8"
                >
                  {['PHP', 'MySQL', 'Redis', 'CDN', 'High-traffic Architecture'].map(tag => (
                    <span key={tag} className="font-mono text-[11px] px-2.5 py-1 border border-border rounded-sm text-muted">{tag}</span>
                  ))}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.7 }}
                  className="grid grid-cols-3 gap-px bg-border rounded-sm overflow-hidden"
                >
                  {results.map(r => (
                    <div key={r.label} className="bg-bg p-4 text-center">
                      <div className="text-2xl font-light tabular-nums mb-0.5" style={{ color: COLOR }}>
                        <Counter to={r.raw} suffix={r.suffix} />
                      </div>
                      <div className="text-muted text-[10px] font-mono uppercase tracking-wider">{r.label}</div>
                    </div>
                  ))}
                </motion.div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.97 }} animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative"
              >
                <div className="absolute -inset-4 rounded-full blur-[60px] opacity-15 pointer-events-none" style={{ background: COLOR }} />
                <BrowserMock />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Panels pleine largeur avec fondus ── */}
        <div className="flex flex-col">
          {panels.map((panel) => (
            <Panel key={panel.num} {...panel} />
          ))}
          <ResultSection />
        </div>

        {/* ── CTA ── */}
        <section className="section-padding py-24">
          <div className="max-w-6xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7 }}
              className="space-y-8"
            >
              <p className="font-mono text-muted text-xs tracking-widest uppercase">Live product</p>
              <h2 className="text-3xl md:text-5xl font-light text-primary">See it in production.</h2>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="https://yomimanga.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium px-6 py-3.5 rounded-sm hover:opacity-90 transition-all duration-200"
                  style={{ background: COLOR, color: '#080808' }}>
                  Explore live platform
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <button onClick={onBack}
                  className="text-sm text-secondary hover:text-primary border-b border-transparent hover:border-secondary/40 transition-all duration-200 pb-px">
                  ← Back to portfolio
                </button>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
    </div>
  )
}

function ResultSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="relative overflow-hidden w-full" style={{ minHeight: '540px' }}>
      {/* bg image */}
      <img src="/img/cs8.webp" alt="" aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none" />
      <div className="absolute inset-0 bg-bg/55 pointer-events-none" />
      {/* Top + bottom fades */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent pointer-events-none" />

      <div className="relative p-8 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase mb-5 block"
            style={{ color: 'rgba(107,114,128,0.7)' }}>
            08 / Result
          </span>
          <h2 className="text-xl md:text-2xl font-light text-primary leading-snug mb-10">
            A system built to last, <span style={{ color: COLOR }}>running at scale.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-3 gap-px bg-white/10 max-w-2xl">
          {results.map((r, i) => (
            <motion.div
              key={r.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
              className="bg-bg/60 backdrop-blur-sm p-6 md:p-10 text-center"
            >
              <div className="text-4xl md:text-5xl font-light tabular-nums mb-2" style={{ color: COLOR }}>
                <Counter to={r.raw} suffix={r.suffix} />
              </div>
              <div className="text-primary text-xs font-medium mb-1">{r.label}</div>
              <div className="text-muted text-[11px]">{r.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
