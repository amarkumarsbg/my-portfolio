import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePortfolioData } from '../context/PortfolioData'

const certifications = [
  {
    title: 'Full Stack Web Development',
    issuer: 'Udemy',
    year: '2023',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    title: 'React — The Complete Guide',
    issuer: 'Udemy',
    year: '2023',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  },
  {
    title: 'Node.js & Express Masterclass',
    issuer: 'Udemy',
    year: '2022',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    title: 'MongoDB for Developers',
    issuer: 'MongoDB University',
    year: '2022',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  },
  {
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    year: '2024',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg',
  },
  {
    title: 'Docker Essentials',
    issuer: 'Docker Inc.',
    year: '2024',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  },
]

export function Certifications() {
  const headerRef = useScrollReveal<HTMLDivElement>()
  const { certifications: cmsCertifications, source } = usePortfolioData()
  const entries =
    source === 'database'
      ? cmsCertifications.map((item) => ({
          title: String(item.title || ''),
          issuer: String(item.issuer || ''),
          year: String(item.year || ''),
          icon: String(item.iconUrl || ''),
        }))
      : certifications

  return (
    <section className="section" id="certifications">
      <div ref={headerRef}>
        <h2 className="section-title">Certifications</h2>
        <p className="cert-subtitle">
          Credentials and courses I&apos;ve completed
        </p>
      </div>

      <div className="cert-grid">
        {entries.map((cert, i) => (
          <CertCard key={cert.title} cert={cert} index={i} />
        ))}
      </div>
    </section>
  )
}

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number]
  index: number
}) {
  const ref = useScrollReveal<HTMLDivElement>(0.15, index * 100)

  return (
    <div className="cert-card" ref={ref}>
      <img
        src={cert.icon}
        alt={cert.title}
        className="cert-icon"
        loading="lazy"
      />
      <div className="cert-info">
        <h3 className="cert-title">{cert.title}</h3>
        <p className="cert-issuer">
          {cert.issuer} &middot; {cert.year}
        </p>
      </div>
    </div>
  )
}
