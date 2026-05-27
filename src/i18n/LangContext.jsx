import { createContext, useContext, useState } from 'react'
import { translations } from './translations'

const LangContext = createContext()

export function LangProvider({ children }) {
  const [lang, setLang] = useState('en')
  const toggle = () => setLang((l) => (l === 'en' ? 'fr' : 'en'))

  return (
    <LangContext.Provider value={{ lang, toggle }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  const { lang, toggle } = useContext(LangContext)
  const t = (key) => translations[lang]?.[key] ?? translations.en[key] ?? key
  return { lang, toggle, t }
}
