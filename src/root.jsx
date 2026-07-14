import { Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './index.css'

export const links = () => [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap' },
  { rel: 'apple-touch-icon', href: '/pwa-icon.svg' },
  { rel: 'canonical', href: 'https://victor-morel.com/' },
]

export const meta = () => [
  { charset: 'utf-8' },
  { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
  // Default SEO — overridden per route
  { title: 'Victor — Builder, Founder & Product Engineer' },
  { name: 'description', content: 'Victor builds products that run in the real world — talkr.ai (voice AI), yomimanga (5M req/day), manju (image translation), opus, powerx.' },
  { name: 'author', content: 'Victor' },
  { name: 'robots', content: 'index, follow' },
  { name: 'theme-color', content: '#080808' },
  // OG defaults
  { property: 'og:type', content: 'website' },
  { property: 'og:site_name', content: 'Victor — Portfolio' },
  { property: 'og:title', content: 'Victor — Builder, Founder & Product Engineer' },
  { property: 'og:description', content: 'I build products that matter — talkr.ai, yomimanga, manju, opus.' },
  { property: 'og:image', content: 'https://victor-morel.com/og-image.jpg' },
  { property: 'og:image:width', content: '1200' },
  { property: 'og:image:height', content: '630' },
  { property: 'og:url', content: 'https://victor-morel.com/' },
  // Twitter
  { name: 'twitter:card', content: 'summary_large_image' },
  { name: 'twitter:title', content: 'Victor — Builder, Founder & Product Engineer' },
  { name: 'twitter:description', content: 'I build products that matter — talkr.ai, yomimanga, manju, opus.' },
  { name: 'twitter:image', content: 'https://victor-morel.com/og-image.jpg' },
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Victor',
  url: 'https://victor-morel.com',
  jobTitle: 'Builder & Founder',
  description: 'Entrepreneur and product engineer — talkr.ai, yomimanga, manju, opus, powerx.',
  knowsAbout: ['Product Engineering', 'LLM & AI', 'PHP', 'Python', 'React', 'Computer Vision', 'Voice AI'],
}

export default function Root() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        {/* UAE Lead chat widget */}
        <script
          src="https://uaelead.com/widget/chat.js"
          data-api-key="sk-a5827842e4e14981910eeecaefce72d5"
          data-source-key="victor-morel"
          data-accent-color="#6EE7F7"
          data-locale="en"
          data-tooltip="Tell me about your project"
          async
        />
      </body>
    </html>
  )
}
