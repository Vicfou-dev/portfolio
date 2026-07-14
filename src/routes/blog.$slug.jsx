import { useParams, Link } from 'react-router'
import { motion } from 'framer-motion'
import { articles, getArticle } from '../data/articles'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LangProvider } from '../i18n/LangContext'

export const meta = ({ params }) => {
  const article = getArticle(params.slug)
  if (!article) {
    return [{ title: 'Article Not Found | Victor' }]
  }
  return [
    { title: `${article.title} | Victor` },
    { name: 'description', content: article.description },
    { property: 'og:title', content: article.title },
    { property: 'og:description', content: article.description },
    { property: 'og:url', content: `https://victor-morel.com/blog/${article.slug}` },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: article.ogImage },
    { property: 'article:published_time', content: article.date },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: article.title },
    { name: 'twitter:description', content: article.description },
    {
      'script:ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: article.title,
        description: article.description,
        datePublished: article.date,
        author: { '@type': 'Person', name: 'Victor', url: 'https://victor-morel.com' },
        url: `https://victor-morel.com/blog/${article.slug}`,
        image: article.ogImage,
        keywords: article.tags.join(', '),
      }),
    },
  ]
}

function ArticleContent() {
  const { slug } = useParams()
  const article = getArticle(slug)
  const others = articles.filter((a) => a.slug !== slug).slice(0, 2)

  if (!article) {
    return (
      <div className="min-h-screen bg-bg text-primary flex items-center justify-center section-padding">
        <div className="text-center">
          <p className="font-mono text-accent text-sm mb-4">404</p>
          <h1 className="text-3xl font-light mb-6">Article not found</h1>
          <Link to="/blog" className="font-mono text-xs text-muted hover:text-accent transition-colors">
            ← Back to blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg text-primary">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />

      <main className="section-padding pt-32 pb-24 max-w-3xl mx-auto">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-12"
        >
          <Link to="/blog" className="flex items-center gap-2 font-mono text-xs text-muted hover:text-accent transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
            </svg>
            All articles
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 flex-wrap mb-5">
            {article.tags.map((tag) => (
              <span key={tag} className="font-mono text-[11px] px-2 py-0.5 border border-border text-accent/70 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
          <h1 className="text-3xl md:text-4xl font-light text-primary leading-snug mb-4">
            {article.title}
          </h1>
          <p className="text-secondary leading-relaxed mb-6 text-lg">
            {article.description}
          </p>
          <div className="flex items-center gap-4 font-mono text-xs text-muted border-t border-border pt-4">
            <span>Victor</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{new Date(article.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span className="w-1 h-1 rounded-full bg-border" />
            <span>{article.readTime} read</span>
          </div>
        </motion.header>

        {/* Article body */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="article-body prose"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Author card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 border border-border rounded-sm p-6 flex items-start gap-5"
        >
          <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex-shrink-0 flex items-center justify-center">
            <span className="font-mono text-accent text-sm">V</span>
          </div>
          <div>
            <p className="font-medium text-primary mb-1">Victor</p>
            <p className="text-secondary text-sm leading-relaxed">
              Builder & Founder — talkr.ai, yomimanga, manju, opus, powerx. Building products that run in the real world.
            </p>
            <a href="/#contact" className="inline-block mt-3 font-mono text-xs text-accent hover:opacity-70 transition-opacity">
              Get in touch →
            </a>
          </div>
        </motion.div>

        {/* More articles */}
        {others.length > 0 && (
          <div className="mt-16">
            <p className="font-mono text-xs text-muted uppercase tracking-widest mb-6">More articles</p>
            <div className="grid gap-4">
              {others.map((a) => (
                <Link
                  key={a.slug}
                  to={`/blog/${a.slug}`}
                  className="group border border-border hover:border-border-light transition-colors duration-300 rounded-sm p-6"
                >
                  <p className="text-sm font-mono text-muted mb-1">{a.readTime} read</p>
                  <h3 className="text-base font-light text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
                    {a.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default function BlogPost() {
  return (
    <LangProvider>
      <ArticleContent />
    </LangProvider>
  )
}
