import { motion } from 'framer-motion'
import { Link } from 'react-router'
import { articles } from '../data/articles'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LangProvider } from '../i18n/LangContext'

export const meta = () => [
  { title: 'Blog — Victor | Product Engineering, Voice AI, Scaling' },
  { name: 'description', content: 'Writings on product engineering, voice AI, building at scale, MCP, and the reality of solo founding in 2026.' },
  { property: 'og:title', content: 'Blog — Victor' },
  { property: 'og:description', content: 'Writings on product engineering, voice AI, scaling, and solo founding.' },
  { property: 'og:url', content: 'https://victor-morel.com/blog' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

function ArticleCard({ article, index }) {
  return (
    <motion.article
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={index}
      className="group border border-border hover:border-border-light transition-colors duration-300 rounded-sm p-8"
    >
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {article.tags.map((tag) => (
          <span key={tag} className="font-mono text-[11px] px-2 py-0.5 border border-border text-muted rounded-sm">
            {tag}
          </span>
        ))}
        <span className="font-mono text-[11px] text-muted ml-auto">{article.readTime} read</span>
      </div>

      <h2 className="text-xl font-light text-primary mb-3 group-hover:text-accent transition-colors duration-300 leading-snug">
        {article.title}
      </h2>
      <p className="text-secondary text-sm leading-relaxed mb-6 max-w-prose">
        {article.description}
      </p>

      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-muted">
          {new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </span>
        <Link
          to={`/blog/${article.slug}`}
          className="flex items-center gap-2 font-mono text-xs text-accent hover:gap-3 transition-all duration-200"
        >
          Read article
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>
    </motion.article>
  )
}

function BlogContent() {
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="min-h-screen bg-bg text-primary">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <main className="section-padding pt-32 pb-24 max-w-4xl mx-auto">
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-accent text-xs tracking-[0.3em] uppercase">Writing</span>
            <div className="h-px bg-border flex-1 max-w-xs" />
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-primary mb-4">
            Notes on building.
          </h1>
          <p className="text-secondary max-w-xl leading-relaxed">
            Real lessons from shipping voice AI, high-traffic platforms, and AI products — from 7+ years as a solo founder.
          </p>
        </div>

        <div className="grid gap-4">
          {sorted.map((article, i) => (
            <ArticleCard key={article.slug} article={article} index={i} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function BlogIndex() {
  return (
    <LangProvider>
      <BlogContent />
    </LangProvider>
  )
}
