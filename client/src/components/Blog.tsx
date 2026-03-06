import { useScrollReveal } from '../hooks/useScrollReveal'

const articles = [
  {
    title: 'Building Real-Time Apps with Socket.io and React',
    excerpt:
      'A deep dive into implementing WebSocket-based real-time communication in modern web applications using Socket.io and React hooks.',
    date: 'Feb 2026',
    readTime: '8 min read',
    tag: 'Tutorial',
    link: '#',
  },
  {
    title: 'Why I Switched from REST to GraphQL',
    excerpt:
      'My experience migrating a production API from REST to GraphQL, the trade-offs I encountered, and the performance gains I observed.',
    date: 'Jan 2026',
    readTime: '6 min read',
    tag: 'Opinion',
    link: '#',
  },
  {
    title: 'Deploying MERN Apps with Docker & AWS',
    excerpt:
      'A step-by-step guide to containerizing your MERN stack application with Docker and deploying it on AWS EC2 with CI/CD.',
    date: 'Dec 2025',
    readTime: '10 min read',
    tag: 'DevOps',
    link: '#',
  },
]

export function Blog() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section" id="blog">
      <div ref={headerRef}>
        <h2 className="section-title">Blog & Articles</h2>
        <p className="blog-subtitle">
          Thoughts, tutorials, and things I&apos;ve learned
        </p>
      </div>

      <div className="blog-grid">
        {articles.map((article, i) => (
          <BlogCard key={i} article={article} index={i} />
        ))}
      </div>
    </section>
  )
}

function BlogCard({
  article,
  index,
}: {
  article: (typeof articles)[number]
  index: number
}) {
  const ref = useScrollReveal<HTMLElement>(0.15, index * 150)

  return (
    <article className="blog-card" ref={ref}>
      <div className="blog-card-top">
        <span className="blog-tag">{article.tag}</span>
        <span className="blog-date">{article.date}</span>
      </div>
      <h3 className="blog-card-title">{article.title}</h3>
      <p className="blog-card-excerpt">{article.excerpt}</p>
      <div className="blog-card-footer">
        <span className="blog-read-time">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="14"
            height="14"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          {article.readTime}
        </span>
        <a href={article.link} className="blog-read-link">
          Read More
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            width="14"
            height="14"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>
    </article>
  )
}
