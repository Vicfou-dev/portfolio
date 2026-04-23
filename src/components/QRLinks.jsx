import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QRCodeSVG } from 'qrcode.react'

const socialLinks = [
  {
    label: 'Portfolio',
    url: 'https://victor-morel.com/',
    mono: 'victor-morel.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/victor-morel-pro',
    mono: 'linkedin.com/in/victor-morel-pro',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    url: 'https://github.com/vicfou-dev',
    mono: 'github.com/vicfou-dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

const projectLinks = [
  { label: 'yomimanga', url: 'https://yomimanga.com', mono: 'yomimanga.com', color: '#EC4899', num: '01' },
  { label: 'talkr.ai',  url: 'https://talkr.ai',     mono: 'talkr.ai',      color: '#6EE7F7', num: '02' },
  { label: 'manju',     url: 'https://manju.pro',    mono: 'manju.pro',     color: '#10B981', num: '03' },
  { label: 'dofus-fm',  url: 'https://web.dofus-fm.cloud', mono: 'dofus-fm.cloud', color: '#F59E0B', num: '04' },
  { label: 'opus',      url: 'https://syopus.com',   mono: 'syopus.com',    color: '#8B5CF6', num: '05' },
]

function QRModal({ link, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center gap-6 px-8"
      >
        <div className="rounded-sm overflow-hidden p-5 bg-[#F8F9FA]">
          <QRCodeSVG
            value={link.url}
            size={240}
            bgColor="#F8F9FA"
            fgColor="#080808"
            level="H"
          />
        </div>
        <div className="text-center">
          <p className="text-primary font-medium text-base">{link.label}</p>
          <p className="font-mono text-xs text-muted mt-1">{link.mono}</p>
        </div>
        <button
          onClick={onClose}
          className="font-mono text-xs text-muted/60 hover:text-primary transition-colors uppercase tracking-widest"
        >
          Fermer ✕
        </button>
      </motion.div>
    </motion.div>
  )
}

function QRCard({ link, color, prefix, index, onExpand }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className="flex items-center gap-5 bg-surface border border-border rounded-sm p-5 group"
    >
      <button
        onClick={() => onExpand(link)}
        className="flex-shrink-0 rounded-sm overflow-hidden p-2 bg-[#F8F9FA] hover:ring-2 transition-all duration-200 cursor-zoom-in"
        style={{ '--tw-ring-color': color + '99' }}
        aria-label={`Agrandir QR ${link.label}`}
      >
        <QRCodeSVG value={link.url} size={80} bgColor="#F8F9FA" fgColor="#080808" level="M" />
      </button>

      <a href={link.url} target="_blank" rel="noopener noreferrer" className="min-w-0 flex-1 group/link">
        {prefix && (
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase mb-1 block" style={{ color }}>
            {prefix}
          </span>
        )}
        <p className="text-primary text-sm font-medium leading-tight">{link.label}</p>
        <p className="font-mono text-xs text-muted truncate mt-0.5">{link.mono}</p>
        <p className="font-mono text-[10px] text-muted/50 mt-2 uppercase tracking-widest group-hover/link:text-muted transition-colors">Ouvrir ↗</p>
      </a>
    </motion.div>
  )
}

export default function QRLinks({ onClose }) {
  const [expanded, setExpanded] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-bg flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-border flex-shrink-0">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
          <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">Links</span>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center text-muted hover:text-primary transition-colors rounded-sm hover:bg-surface"
          aria-label="Fermer"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
        {/* Socials */}
        <div className="space-y-4">
          <p className="font-mono text-[10px] text-muted/50 uppercase tracking-[0.3em]">Profils</p>
          {socialLinks.map((link, i) => (
            <QRCard key={link.label} link={link} color="#6EE7F7" index={i} onExpand={setExpanded} />
          ))}
        </div>

        {/* Separator */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-border" />
          <span className="font-mono text-[10px] text-muted/40 uppercase tracking-widest">Projects</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        {/* Projects */}
        <div className="space-y-4 pb-6">
          {projectLinks.map((link, i) => (
            <QRCard key={link.label} link={link} color={link.color} prefix={link.num} index={socialLinks.length + i} onExpand={setExpanded} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border flex-shrink-0">
        <p className="font-mono text-[10px] text-muted/50 text-center uppercase tracking-widest">
          Tap sur le QR pour l'agrandir
        </p>
      </div>

      <AnimatePresence>
        {expanded && <QRModal link={expanded} onClose={() => setExpanded(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}


const links = [
  {
    label: 'Portfolio',
    url: 'https://victor-morel.com/',
    mono: 'victor-morel.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    url: 'https://linkedin.com/in/victor-morel-pro',
    mono: 'linkedin.com/in/victor-morel-pro',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    url: 'https://github.com/vicfou-dev',
    mono: 'github.com/vicfou-dev',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

