import { useLang } from '../i18n/LangContext'

export default function Footer() {
  const year = new Date().getFullYear()
  const { t } = useLang()

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
          <a href="#hero" className="font-mono text-xs text-muted hover:text-accent transition-colors">{t('footer_top')}</a>
          <span className="font-mono text-muted text-xs">
            {t('footer_built')}
          </span>
        </div>
      </div>
    </footer>
  )
}
