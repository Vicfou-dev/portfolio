import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setDone(true)
            setTimeout(onComplete, 600)
          }, 200)
          return 100
        }
        return p + Math.random() * 18 + 4
      })
    }, 80)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center gap-8"
          >
            <span className="font-mono text-accent text-sm tracking-[0.3em] uppercase">
              Victor
            </span>

            <div className="w-48 h-px bg-border-light overflow-hidden relative">
              <motion.div
                className="absolute inset-y-0 left-0 bg-accent"
                initial={{ width: '0%' }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>

            <span className="font-mono text-muted text-xs tabular-nums">
              {String(Math.min(Math.round(progress), 100)).padStart(3, '0')}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
