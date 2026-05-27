import { useRef, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useLang } from '../i18n/LangContext'

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

function PillarCard({ pillar, i, inView }) {
  const { ref, rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt(4)
  return (
    <motion.div
      ref={ref}
      initial="hidden" animate={inView ? 'visible' : 'hidden'}
      variants={fadeUp} custom={i + 3}
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative bg-bg p-8 md:p-10 group hover:bg-surface transition-colors duration-300 overflow-hidden cursor-default"
    >
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top" />
      <span className="font-mono text-accent/40 text-xs block mb-6 group-hover:text-accent group-hover:text-base group-hover:font-medium transition-all duration-300">
        {pillar.number}
      </span>
      <h3 className="text-lg font-medium text-primary mb-4 group-hover:translate-x-1 transition-transform duration-300">{pillar.title}</h3>
      <p className="text-secondary text-sm leading-relaxed">{pillar.description}</p>
    </motion.div>
  )
}

export default function Approach() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const { t } = useLang()
  const pillars = t('pillars')

  return (
    <section id="approach" ref={ref} className="relative py-32 section-padding overflow-hidden" aria-label="Approach">
      {/* Background image with parallax */}
      <motion.img
        src="/img/approch.webp"
        alt=""
        aria-hidden="true"
        style={{ y: bgY }}
        className="absolute inset-0 w-full h-[115%] object-cover object-center -top-[7.5%] pointer-events-none"
      />
      <div className="absolute inset-0 bg-bg/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">{t('approach_label')}</span>
          <motion.div
            className="h-px bg-border flex-1 max-w-xs"
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <motion.h2
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
            className="text-3xl md:text-4xl font-light text-primary leading-snug"
          >
            {t('approach_h2')}
          </motion.h2>
          <motion.p
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={2}
            className="text-secondary leading-relaxed self-end"
          >
            {t('approach_sub')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-white/5">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.number} pillar={pillar} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
