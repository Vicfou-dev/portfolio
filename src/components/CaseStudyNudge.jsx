import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CaseStudyNudge({ onOpen }) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  const dismiss = (e) => {
    e.stopPropagation()
    setDismissed(true)
  }

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed bottom-6 right-6 z-50 max-w-xs cursor-pointer group"
          onClick={onOpen}
          role="button"
          aria-label="View yomimanga case study"
        >
          {/* Glow */}
          <div
            className="absolute inset-0 rounded-sm blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{ background: '#EC4899' }}
          />

          <div className="relative border border-[#EC4899]/30 bg-bg/95 backdrop-blur-md rounded-sm p-4 shadow-2xl group-hover:border-[#EC4899]/60 transition-all duration-300">

            {/* Close */}
            <button
              onClick={dismiss}
              className="absolute top-2.5 right-2.5 w-5 h-5 flex items-center justify-center text-muted hover:text-primary transition-colors text-xs"
              aria-label="Dismiss"
            >
              ✕
            </button>

            {/* Header row */}
            <div className="flex items-center gap-2 mb-3 pr-4">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: '#EC4899' }}
              />
              <span className="font-mono text-[10px] text-muted uppercase tracking-widest">
                One deep dive available
              </span>
            </div>

            {/* Content */}
            <div className="flex items-start gap-3">
              {/* Mini thumbnail */}
              <div
                className="w-12 h-12 rounded-sm flex-shrink-0 flex items-center justify-center border border-[#EC4899]/20"
                style={{ background: '#EC491908' }}
              >
                <span className="font-mono text-[#EC4899] text-lg font-light">y</span>
              </div>

              <div className="min-w-0">
                <p className="text-primary text-sm font-medium leading-tight mb-0.5">
                  yomimanga
                </p>
                <p className="text-muted text-xs leading-relaxed">
                  How I scaled a manga platform to <span className="text-[#EC4899]">5M+ daily requests</span> — architecture, decisions, lessons.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
              <span className="font-mono text-[10px] text-muted">Case Study</span>
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="font-mono text-xs flex items-center gap-1.5"
                style={{ color: '#EC4899' }}
              >
                Read now
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
