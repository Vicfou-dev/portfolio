export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border section-padding py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-muted text-xs">
          © {year} Victor — All rights reserved
        </span>

        <span className="font-mono text-muted/50 text-xs tracking-widest hidden md:block">
          Not ideas. Systems that run.
        </span>

        <div className="flex items-center gap-6">
          <a href="#hero" className="font-mono text-xs text-muted hover:text-accent transition-colors">↑ Top</a>
          <span className="font-mono text-muted text-xs">
            Built with React · Three.js · Framer Motion
          </span>
        </div>
      </div>
    </footer>
  )
}
