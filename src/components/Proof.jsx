import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useInView, animate, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'

function useTilt(strength = 18) {
  const ref = useRef(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(rawX, { stiffness: 200, damping: 20, mass: 0.5 })
  const rotateY = useSpring(rawY, { stiffness: 200, damping: 20, mass: 0.5 })
  const onMouseMove = useCallback((e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawY.set(((e.clientX - cx) / (rect.width / 2)) * strength)
    rawX.set(-((e.clientY - cy) / (rect.height / 2)) * (strength * 0.6))
  }, [rawX, rawY, strength])
  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])
  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave }
}

const metrics = [
  { raw: 5,   suffix: 'M+',  label: 'Daily requests',   sub: 'Served in production' },
  { raw: 100, suffix: 'K+',  label: 'Users',             sub: 'Across products' },
  { raw: 5,   suffix: '+',   label: 'Products shipped',  sub: 'From scratch' },
  { raw: 10,   suffix: '+',   label: 'Years building',    sub: 'Systems in production' },
]

function AnimatedNumber({ raw, suffix, inView }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    if (!inView) return
    const ctrl = animate(0, raw, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return ctrl.stop
  }, [inView, raw])
  return <>{display}{suffix}</>
}

function MetricCard({ m, i, inView }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(5)
  return (
    <motion.div
      ref={ref}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp} custom={i + 1}
      style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="bg-bg p-8 md:p-12 text-center group hover:bg-surface transition-colors duration-300 cursor-default"
    >
      <div className="text-5xl md:text-6xl font-light text-accent mb-2 tabular-nums">
        <AnimatedNumber raw={m.raw} suffix={m.suffix} inView={inView} />
      </div>
      <div className="text-primary text-sm font-medium mb-1">{m.label}</div>
      <div className="text-muted text-xs">{m.sub}</div>
    </motion.div>
  )
}

const differentiators = [
  '5M+ daily requests handled in production',
  '100K+ real users across multiple products',
  'From zero to revenue, multiple times',
  'I design, build, and iterate — end to end',
  'Speed without breaking product quality',
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Proof() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="proof" ref={ref} className="relative py-32 section-padding overflow-hidden" aria-label="Proof">
      {/* Background image with parallax */}
      <motion.img
        src="/img/proof.webp"
        alt=""
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[115%] object-cover object-top -top-[7.5%] pointer-events-none"
      />
      <div className="absolute inset-0 bg-bg/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">04 / Proof</span>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-24">
          {metrics.map((m, i) => (
            <MetricCard key={m.label} m={m} i={i} inView={inView} />
          ))}
        </div>

        {/* Differentiators */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={4}
          >
            <h2 className="text-2xl md:text-3xl font-light text-primary leading-snug mb-6">
              I ship — and it gets used.<br />
              <span className="text-accent">That’s the difference.</span>
            </h2>
            <p className="text-secondary leading-relaxed">
              Most people build features.<br />
              Few build products people come back to.<br /><br />
              I focus on shipping fast, iterating from real usage,
              and turning ideas into products that reach scale.
            </p>
          </motion.div>

          <ul className="space-y-px">
            {differentiators.map((d, i) => (
              <motion.li
                key={d}
                initial="hidden" animate={inView ? 'visible' : 'hidden'}
                variants={fadeUp} custom={i + 5}
                className="flex items-start gap-4 py-4 border-b border-border group"
              >
                <svg
                  className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-secondary text-sm group-hover:text-primary transition-colors">{d}</span>
              </motion.li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  )
}

