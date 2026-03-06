import { useScrollReveal } from '../hooks/useScrollReveal'

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance / Self-Employed',
    period: '2022 — Present',
    description:
      'Building production-ready web applications for clients using React, Node.js, and MongoDB. Delivering end-to-end solutions from UI design to deployment on AWS and Vercel.',
    tech: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
  },
  {
    role: 'Frontend Developer',
    company: 'Open Source Contributor',
    period: '2021 — 2022',
    description:
      'Contributed to open-source projects, built reusable component libraries, and developed responsive web interfaces with modern CSS and JavaScript.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Git'],
  },
  {
    role: 'Web Development Intern',
    company: 'Self-Directed Learning',
    period: '2020 — 2021',
    description:
      'Completed 50+ projects while learning full-stack development. Mastered HTML, CSS, JavaScript, React, and backend technologies through hands-on building.',
    tech: ['HTML', 'CSS', 'JavaScript', 'React', 'Express'],
  },
]

export function Experience() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section" id="experience">
      <div ref={headerRef}>
        <h2 className="section-title">Experience</h2>
        <p className="experience-subtitle">
          My professional journey and career milestones
        </p>
      </div>

      <div className="timeline">
        {experiences.map((exp, i) => (
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
