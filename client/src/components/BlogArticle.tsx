import { Link, useParams } from 'react-router-dom'
import { usePortfolioData } from '../context/PortfolioData'

export function BlogArticle() {
  const { slug } = useParams()
  const { blog } = usePortfolioData()
  const article = blog.find((entry) => entry.slug === slug)
  if (!article) {
    return (
      <main className="blog-article-page">
        <h1>Article not found</h1>
        <Link to="/">Back to portfolio</Link>
      </main>
    )
  }
  return (
    <main className="blog-article-page">
      <Link to="/blog" className="admin-back-link">
        ← Back to articles
      </Link>
      <span className="blog-tag">{String(article.tag || 'Article')}</span>
      <p className="blog-date">
        {String(article.date || '')} · {String(article.readTime || '')}
      </p>
      <h1>{String(article.title || '')}</h1>
      <p className="blog-article-excerpt">{String(article.excerpt || '')}</p>
      {typeof article.coverImageUrl === 'string' && article.coverImageUrl && (
        <img src={article.coverImageUrl} alt="" />
      )}
      <div className="blog-article-content">
        {String(article.content || 'This post does not have body content yet.')}
      </div>
    </main>
  )
}
