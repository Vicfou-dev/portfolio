import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const logoClass = 'h-8 w-auto object-contain transition-all duration-300'
const logoStyle = { filter: 'brightness(0) invert(1)', opacity: 0.4 }
const logoHoverStyle = { filter: 'brightness(0) invert(1)', opacity: 0.75 }

function LogoImg({ src, alt }) {
  const [hovered, setHovered] = useState(false)
  return (
    <img
      src={src}
      alt={alt}
      className={logoClass}
      style={hovered ? logoHoverStyle : logoStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    />
  )
}

const clients = [
  { id: 'firefox',  label: 'Firefox',          logo: <LogoImg src="/img/firefox.webp"        alt="Firefox" /> },
  { id: 'total',    label: 'TotalEnergies',     logo: <LogoImg src="/img/total-energies.webp" alt="TotalEnergies" /> },
  { id: 'marine',   label: 'Marine Nationale',  logo: <LogoImg src="/img/marine.webp"         alt="Marine Nationale" /> },
  { id: 'edf',      label: 'EDF',               logo: <LogoImg src="/img/edf.webp"            alt="EDF" /> },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: 'easeOut' },
  }),
}

export default function Clients() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      aria-label="Clients and partners"
      className="py-16 section-padding border-y border-border"
    >
      <div className="max-w-6xl mx-auto">

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
          className="font-mono text-muted text-xs tracking-[0.3em] uppercase text-center mb-10"
        >
          Trusted by
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8 md:gap-x-20">
          {clients.map((client, i) => (
            <motion.div
              key={client.id}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              variants={fadeUp}
              custom={i}
              className="cursor-default"
              title={client.label}
            >
              {client.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
