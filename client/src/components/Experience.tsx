import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePortfolioData } from '../context/PortfolioData'

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Startappss System India Pvt. Ltd.',
    period: 'Jul 2025 — Present',
    description:
      'Contributed to BluDot Rewards, a cashback platform using receipt uploads and linked cards. Built and maintained responsive React interfaces, integrated REST APIs, and delivered frontend features for Optima AI and Exiqo. Investigated production UI issues and worked with backend, QA, and product teams in an Agile workflow.',
    tech: [
      'React',
      'JavaScript',
      'REST APIs',
      'Tailwind CSS',
      'Bootstrap',
      'Sass',
    ],
  },
  {
    role: 'Back End Developer',
    company: 'Vyapar TaxOne',
    period: 'Mar 2025 — May 2025',
    description:
      'Developed accounting automation features with Node.js, Express, and MongoDB. Integrated Tally, Zoho, QuickBooks, and OpenAI APIs, optimized database queries, and resolved backend issues.',
    tech: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'OpenAI APIs',
      'Tally',
      'Zoho',
      'QuickBooks',
    ],
  },
  {
    role: 'Engineer',
    company: 'Virtusa · Clients: Google (IMA) and Bank of Montreal (BMO)',
    period: 'Aug 2021 — Nov 2024',
    description:
      'Developed and maintained Node.js REST APIs, supported Google IMA frontend issue resolution, and improved backend performance with Redis. Performed unit testing with Mocha and Chai, contributed to API migrations, and collaborated with client teams in Agile delivery.',
    tech: ['Node.js', 'REST APIs', 'Redis', 'React', 'Mocha', 'Chai', 'CI/CD'],
  },
]

export function Experience() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const { experience: cmsExperience, source } = usePortfolioData()
  const entries =
    source === 'database' && cmsExperience.length
      ? cmsExperience.map((item) => ({
          role: String(item.role || ''),
          company: String(item.company || ''),
          period: String(item.period || ''),
          description: String(item.description || ''),
          tech: Array.isArray(item.tech) ? item.tech.map(String) : [],
        }))
      : experiences

  return (
    <section className="section" id="experience">
      <div ref={headerRef}>
        <h2 className="section-title">Experience</h2>
        <p className="experience-subtitle">
          My professional journey and career milestones
        </p>
      </div>

      <div className="timeline">
        {entries.map((exp, i) => (
          <TimelineItem key={i} exp={exp} index={i} />
        ))}
      </div>
    </section>
  )
}

function TimelineItem({
  exp,
  index,
}: {
  exp: (typeof experiences)[number]
  index: number
}) {
  const ref = useScrollReveal<HTMLDivElement>(0.15, index * 150)

  return (
    <div className="timeline-item" ref={ref}>
      <div className="timeline-dot" />
      <div className="timeline-content">
        <span className="timeline-period">{exp.period}</span>
        <h3 className="timeline-role">{exp.role}</h3>
        <p className="timeline-company">{exp.company}</p>
        <p className="timeline-desc">{exp.description}</p>
        <div className="timeline-tech">
          {exp.tech.map((t) => (
            <span key={t} className="timeline-tag">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
