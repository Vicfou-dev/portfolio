import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const socials = [
  { label: 'GitHub', href: 'https://github.com/', mono: 'github.com/vicfou-dev' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', mono: 'linkedin.com/in/victor-morel-pro' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="contact"
      ref={ref}
      className="py-32 section-padding relative overflow-hidden"
      aria-label="Contact"
    >
      {/* Contact image — mobile background */}
      <ContactImageMobile />
      {/* Contact image — right side parallax (desktop) */}
      <ContactImage />
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">

        <motion.div
          initial="hidden" animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp} custom={0}
          className="flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">05 / Contact</span>
          <div className="h-px bg-border flex-1 max-w-xs" />
        </motion.div>

        <div className="max-w-3xl">
          <motion.h2
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={1}
            className="text-4xl md:text-6xl font-light leading-tight text-primary mb-8"
          >
            Let’s build something{' '}
            <span className="text-gradient">together.</span>
          </motion.h2>

          <motion.p
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={2}
            className="text-secondary text-lg leading-relaxed mb-12 max-w-xl"
          >
            An ambitious project, a collaboration, a product conversation —
            I reply to serious projects and meaningful conversations.
            No forms: just a direct email.
          </motion.p>

          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={3}
            className="mb-16"
          >
            <a
              href="mailto:victormorel.pro@gmail.com"
              className="group inline-flex items-center gap-4 text-lg md:text-2xl lg:text-3xl font-light text-primary hover:text-accent transition-colors duration-300 break-all"
            >
              victormorel.pro@gmail.com
              <svg
                className="w-6 h-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial="hidden" animate={inView ? 'visible' : 'hidden'}
            variants={fadeUp} custom={4}
            className="flex flex-wrap gap-6"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-1 hover:opacity-80 transition-opacity"
              >
                <span className="font-mono text-[10px] text-muted uppercase tracking-widest">{s.label}</span>
                <span className="text-sm text-secondary group-hover:text-accent transition-colors">{s.mono}</span>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ContactImageMobile() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  return (
    <div ref={ref} className="lg:hidden absolute inset-0 pointer-events-none overflow-hidden">
      <motion.img
        src="/img/contact.webp"
        alt=""
        aria-hidden="true"
        style={{ y }}
        className="absolute inset-0 w-full h-[115%] object-cover object-top -top-[7.5%]"
      />
      <div className="absolute inset-0 bg-bg/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg pointer-events-none" />
    </div>
  )
}

function ContactImage() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute right-0 top-0 bottom-0 w-[45%] overflow-hidden pointer-events-none hidden lg:block"
    >
      <motion.img
        src="/img/contact.webp"
        alt="Contact"
        style={{ y }}
        className="absolute inset-0 w-full h-[115%] object-cover object-top -top-[7.5%]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-bg/60" />
    </motion.div>
  )
}
