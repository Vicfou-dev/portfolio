import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const timelineItems = [
  {
    label: 'Product',
    tag: 'Strategy',
    stack: 'Vision · Roadmap · Priorities · UX',
    detail: 'I define what to build and why. Product decisions grounded in real usage — not assumptions. From 0-to-1 to iterating at scale.',
  },
  {
    label: 'Design',
    tag: 'Visual',
    stack: 'Art direction · Visual systems · UI',
    detail: 'Design that reduces friction. Every pixel serves a purpose — from brand identity to interface systems that feel inevitable.',
  },
  {
    label: 'Engineering',
    tag: 'Full-stack',
    stack: 'React · PHP · Python · Infra',
    detail: 'I build what I design. End-to-end ownership — frontend, backend, infrastructure. No translation loss between vision and code.',
  },
  {
    label: 'Growth',
    tag: 'Distribution',
    stack: 'SEO · Acquisition · Retention · Analytics',
    detail: 'Distribution as a product function. Building the engine that brings and keeps users — not as an afterthought.',
  },
  {
    label: 'Branding',
    tag: 'Identity',
    stack: 'Identity · Narrative · Positioning',
    detail: 'The story behind the product. Positioning, naming, visual language — brands that resonate before a word is read.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="about" ref={ref} className="relative py-32 section-padding overflow-hidden" aria-label="About">
      {/* Background image with parallax */}
      <motion.img
        src="/img/about.webp"
        alt=""
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[115%] object-cover object-center -top-[7.5%] pointer-events-none"
      />
      <div className="absolute inset-0 bg-bg/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg pointer-events-none" />
      {/* Left-side depth gradient — anchors content over image */}
      <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-bg/30 to-transparent pointer-events-none" />
      <div className="relative max-w-6xl mx-auto">

        {/* Section label */}
        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">02 / About</span>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        <div className="space-y-16">

          {/* Top row: photo + text */}
          <div className="grid md:grid-cols-3 gap-16 lg:gap-20 items-start">

          {/* Left — photo */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-[280px] mx-auto md:mx-0 overflow-hidden rounded-sm">
              <img
                src="https://media.licdn.com/dms/image/v2/D5603AQGbIK-oMjn6_A/profile-displayphoto-scale_400_400/B56Z2WFhfXKoAg-/0/1776339530087?e=1778112000&v=beta&t=DbX5cvpMbj2Kq5SGd-rtbrE0IxTpVABo7_bcfP47g-Q"
                alt="Victor"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 border border-accent/20 rounded-sm pointer-events-none" />
            </div>
            <div className="mt-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
              <span className="font-mono text-accent text-xs tracking-widest">Available</span>
            </div>
          </motion.div>

          {/* Right — text */}
          <div className="space-y-6 md:col-span-2">
            <motion.h2
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp} custom={1}
              className="text-3xl md:text-4xl font-light leading-snug text-primary"
            >
              I build products that don’t stay theoretical — they run in the real world.
            </motion.h2>

            <motion.p
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp} custom={2}
              className="text-secondary leading-relaxed"
            >
              Over the past 10 years, I’ve designed, built, and scaled multiple
              products — from early ideas to systems handling millions of
              requests daily.
            </motion.p>

            <motion.p
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp} custom={3}
              className="text-secondary leading-relaxed"
            >
              I work end-to-end: product, engineering, and infrastructure.
              Not just shipping features — building systems that run, evolve,
              and handle real usage.
            </motion.p>

            <motion.p
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp} custom={4}
              className="text-secondary leading-relaxed"
            >
              My approach is simple: ship fast, learn from real users, and
              iterate until it works at scale.
            </motion.p>
          </div>
          </div>

          {/* Interactive Process Timeline */}
          <div className="pt-8 border-t border-border">
            <motion.p
              initial="hidden" animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp} custom={5}
              className="font-mono text-accent/40 text-[10px] tracking-[0.45em] uppercase mb-10"
            >
              Process
            </motion.p>

            <div className="grid md:grid-cols-[1fr_1.5fr] gap-0 md:gap-20 items-start">

              {/* LEFT — steps */}
              <div className="relative">
                {/* Vertical gradient line */}
                <motion.div
                  className="absolute left-5 top-0 bottom-0 w-px"
                  style={{ background: 'linear-gradient(to bottom, rgba(110,231,247,0.5), rgba(110,231,247,0.08), transparent)' }}
                  initial={{ scaleY: 0, originY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
                />

                <div className="space-y-1">
                  {timelineItems.map((item, i) => {
                    const isActive = activeIndex === i
                    return (
                      <motion.div
                        key={item.label}
                        initial="hidden" animate={inView ? 'visible' : 'hidden'}
                        variants={fadeUp} custom={i + 6}
                        onMouseEnter={() => setActiveIndex(i)}
                        className="relative flex items-center gap-5 py-2.5 cursor-default"
                      >
                        {/* Node */}
                        <div
                          className="relative z-10 flex-shrink-0 w-10 h-10 rounded-sm border flex items-center justify-center transition-all duration-300"
                          style={{
                            borderColor: isActive ? 'rgba(110,231,247,0.5)' : 'rgba(255,255,255,0.08)',
                            background: isActive ? 'rgba(110,231,247,0.08)' : '#080808',
                            boxShadow: isActive ? '0 0 14px rgba(110,231,247,0.2)' : 'none',
                          }}
                        >
                          <span
                            className="font-mono text-[10px] transition-colors duration-300"
                            style={{ color: isActive ? '#6EE7F7' : 'rgba(107,114,128,0.5)' }}
                          >
                            {String(i + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Label */}
                        <motion.span
                          animate={{ x: isActive ? 6 : 0, opacity: isActive ? 1 : 0.35 }}
                          transition={{ duration: 0.25, ease: 'easeOut' }}
                          className="text-xl font-light transition-all duration-300"
                          style={{
                            color: isActive ? '#6EE7F7' : '#F5F0EB',
                            textShadow: isActive ? '0 0 20px rgba(110,231,247,0.3)' : 'none',
                          }}
                        >
                          {item.label}
                        </motion.span>

                        {/* Tag — active only */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.span
                              initial={{ opacity: 0, x: -6 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -6 }}
                              transition={{ duration: 0.2 }}
                              className="font-mono text-[9px] text-accent/50 tracking-[0.3em] uppercase ml-auto"
                            >
                              {item.tag}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* RIGHT — detail panel (desktop) */}
              <div className="hidden md:block">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="pt-2"
                  >
                    <p className="font-mono text-[10px] text-accent/40 tracking-[0.35em] uppercase mb-5">
                      {timelineItems[activeIndex].tag}
                    </p>
                    <h3 className="text-3xl font-light text-primary mb-5 leading-snug">
                      {timelineItems[activeIndex].label}
                    </h3>
                    <p className="text-secondary leading-relaxed mb-6 text-base">
                      {timelineItems[activeIndex].detail}
                    </p>
                    <p className="font-mono text-xs tracking-wide"
                      style={{ color: 'rgba(107,114,128,0.55)', letterSpacing: '0.04em' }}>
                      {timelineItems[activeIndex].stack}
                    </p>
                    <motion.div
                      className="mt-6 h-px"
                      style={{ background: 'linear-gradient(to right, rgba(110,231,247,0.4), transparent)' }}
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
