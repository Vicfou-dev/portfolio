import { useNavigate } from 'react-router'
import { LangProvider } from '../i18n/LangContext'
import CaseStudyYomimanga from '../components/CaseStudyYomimanga'

export const meta = () => [
  { title: 'yomimanga — Building a 5M req/day Manga Platform from Scratch | Victor' },
  { name: 'description', content: 'Case study: how I designed, built and scaled yomimanga to 5M+ daily requests as a solo founder — architecture, caching, PHP, Redis, CDN decisions.' },
  { property: 'og:title', content: 'yomimanga Case Study — 5M Daily Requests, Solo-Built' },
  { property: 'og:description', content: 'How I built a high-traffic manga platform from zero to 5M+ daily requests as a solo founder.' },
  { property: 'og:url', content: 'https://victor-morel.com/case/yomimanga' },
  { property: 'og:image', content: 'https://victor-morel.com/og-image.jpg' },
  {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: 'Building yomimanga: From Zero to 5M Daily Requests',
      author: { '@type': 'Person', name: 'Victor' },
      url: 'https://victor-morel.com/case/yomimanga',
      description: 'Case study on scaling a manga platform to 5M+ daily requests solo.',
    }),
  },
]

export default function CaseYomimanga() {
  const navigate = useNavigate()
  return (
    <LangProvider>
      <CaseStudyYomimanga onBack={() => navigate('/')} />
    </LangProvider>
  )
}
