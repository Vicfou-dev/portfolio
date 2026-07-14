import { Link, useLocation } from 'react-router'
import { useLang } from '../i18n/LangContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLang()
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <footer className="border-t border-border section-padding py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-mono text-muted text-xs">
          © {year} Victor — {t('footer_rights')}
        </span>

        <span className="font-mono text-muted/50 text-xs tracking-widest hidden md:block">
          {t('footer_tagline')}
        </span>

        <div className="flex items-center gap-6">
          <Link
            to={isHome ? '#hero' : '/'}
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            {t('footer_top')}
          </Link>
          <Link
            to="/blog"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
          >
            Blog
          </Link>
          <span className="font-mono text-muted text-xs">
            {t('footer_built')}
          </span>
        </div>
      </div>
    </footer>
  )
}
