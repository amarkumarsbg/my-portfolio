import { useScrollReveal } from '../hooks/useScrollReveal'

const services = [
  {
    title: 'AI-Powered Applications',
    description:
      'Building intelligent apps with ChatGPT, Gemini, and LangChain integration — chatbots, content generators, and smart automation.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="28"
        height="28"
      >
        <path d="M12 2a4 4 0 0 1 4 4c0 1.95-1.4 3.58-3.25 3.93" />
        <path d="M12 2a4 4 0 0 0-4 4c0 1.95 1.4 3.58 3.25 3.93" />
        <path d="M12 10v12" />
        <path d="M8 16h8" />
        <path d="M6 20h12" />
      </svg>
    ),
  },
  {
    title: 'Web Development',
    description:
      'Building responsive, high-performance web applications using modern frameworks like React, Next.js, and Node.js.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="28"
        height="28"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    title: 'Mobile App Development',
    description:
      'Building cross-platform mobile applications with React Native — delivering native performance on both iOS and Android from a single codebase.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="28"
        height="28"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18.01" />
      </svg>
    ),
  },
  {
    title: 'API Development',
    description:
      'Designing and building RESTful and GraphQL APIs with secure authentication, rate limiting, and optimized database queries.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="28"
        height="28"
      >
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
      </svg>
    ),
  },
  {
    title: 'UI/UX Design',
    description:
      'Creating intuitive, beautiful user interfaces with a focus on accessibility, responsiveness, and seamless user experience.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="28"
        height="28"
      >
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
    ),
  },
  {
    title: 'Content Writing',
    description:
      'Crafting technical blogs, clear documentation, and compelling copywriting that communicates complex ideas in a simple, engaging way.',
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="28"
        height="28"
      >
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </svg>
    ),
  },
]

export function Services() {
  const headerRef = useScrollReveal<HTMLDivElement>()

  return (
    <section className="section" id="services">
      <div ref={headerRef}>
        <h2 className="section-title">What I Offer</h2>
        <p className="services-subtitle">
          Services I provide to bring your ideas to life
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number]
  index: number
}) {
  const ref = useScrollReveal<HTMLDivElement>(0.15, index * 120)

  return (
    <div className="service-card" ref={ref}>
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-desc">{service.description}</p>
    </div>
  )
}
