import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

type CaseStudyKey = 'mydetailos' | 'sk-academy'

const caseStudies = {
  mydetailos: {
    name: 'MyDetailOS',
    category: 'SAAS · WORKSHOP OPERATIONS',
    headline: 'A connected workspace for automotive service teams.',
    summary:
      'A multi-tenant workshop management platform built for automotive detailing studios and workshops, bringing day-to-day service operations into one place.',
    website: 'https://www.mydetailos.com/',
    image: '/projects/mydetailos-overview.png',
    imageAlt: 'MyDetailOS product overview',
    overview:
      'I built MyDetailOS from scratch as a full-stack product. The platform is organized around the vehicle service journey, from booking and inspection through job progress, billing, and customer follow-up.',
    workflows: [
      [
        'Bookings and inspections',
        'Capture appointments and record vehicle condition before work begins.',
      ],
      [
        'Job cards and service progress',
        'Give teams a shared view of assigned work and its current stage.',
      ],
      [
        'Workshop operations',
        'Connect inventory, invoices, payments, and customer records to the service workflow.',
      ],
      [
        'Customer and platform access',
        'Support a customer portal alongside organization-scoped workshop workspaces and platform administration.',
      ],
    ],
    contribution:
      'Designed and implemented responsive product interfaces, REST API workflows, and organization-scoped access across the application.',
    stack: [
      'Next.js',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Node.js',
      'Express',
      'Prisma',
      'PostgreSQL',
      'Vitest',
    ],
  },
  'sk-academy': {
    name: 'SK Academy',
    category: 'EDTECH · SCHOOL MANAGEMENT',
    headline: 'A public school website with a dedicated staff portal.',
    summary:
      'A full-stack school platform that pairs a welcoming public presence with staff tools for managing school information and admissions workflows.',
    website: 'https://www.skacademy.net/',
    image: '',
    imageAlt: '',
    overview:
      'I built the application from scratch as two connected experiences: a responsive public website for families and a separate authenticated portal for staff. The structure keeps visitor-facing information clear while giving staff a focused place to manage school content and inquiries.',
    workflows: [
      [
        'Public school information',
        'Present school details and key information for families in a responsive experience.',
      ],
      [
        'Admissions inquiries',
        'Give prospective families a clear path to submit admission inquiries.',
      ],
      [
        'Staff administration',
        'Provide a separate staff area for school content and operational records.',
      ],
      [
        'Protected access',
        'Keep administrative workflows behind staff authentication.',
      ],
    ],
    contribution:
      'Built the public and staff-facing interfaces, connected them to backend APIs, and shaped the experience for desktop and mobile use.',
    stack: [
      'Next.js App Router',
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Zustand',
      'Express.js',
      'Prisma',
      'PostgreSQL',
    ],
  },
} satisfies Record<
  CaseStudyKey,
  {
    name: string
    category: string
    headline: string
    summary: string
    website: string
    image: string
    imageAlt: string
    overview: string
    workflows: [string, string][]
    contribution: string
    stack: string[]
  }
>

export function ProjectCaseStudy({ project }: { project: CaseStudyKey }) {
  const study = caseStudies[project]
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <main className="case-study-page">
      <article className="case-study-content">
        <Link to="/projects" className="case-study-back">
          ← All projects
        </Link>
        <section className="case-study-hero">
          <div className="case-study-copy">
            <p className="case-study-eyebrow">{study.category}</p>
            <h1>{study.name}</h1>
            <h2>{study.headline}</h2>
            <p className="case-study-summary">{study.summary}</p>
            <a
              className="case-study-visit"
              href={study.website}
              target="_blank"
              rel="noreferrer"
            >
              Visit live project <span aria-hidden="true">↗</span>
            </a>
          </div>
          {study.image ? (
            <img
              className="case-study-cover"
              src={study.image}
              alt={study.imageAlt}
            />
          ) : (
            <div
              className="case-study-cover case-study-school-art"
              aria-label="SK Academy project illustration"
            >
              <div className="school-art-window">
                <span>SK</span>
                <b>Academy</b>
                <i>Learning together</i>
              </div>
              <div className="school-art-sun" />
            </div>
          )}
        </section>

        <section className="case-study-section">
          <p className="case-study-eyebrow">THE PROJECT</p>
          <h2>Overview</h2>
          <p>{study.overview}</p>
        </section>

        <section className="case-study-section">
          <p className="case-study-eyebrow">CORE WORKFLOWS</p>
          <h2>What the platform supports</h2>
          <div className="case-study-workflows">
            {study.workflows.map(([title, description], index) => (
              <div className="case-study-workflow" key={title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-study-bottom-grid">
          <div className="case-study-section">
            <p className="case-study-eyebrow">MY CONTRIBUTION</p>
            <h2>What I built</h2>
            <p>{study.contribution}</p>
          </div>
          <div className="case-study-section">
            <p className="case-study-eyebrow">TECHNOLOGY</p>
            <h2>Stack</h2>
            <ul className="case-study-stack">
              {study.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
        <footer className="case-study-footer">
          <p>Want to talk about a similar project?</p>
          <Link to="/contact" className="case-study-visit">
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </footer>
      </article>
    </main>
  )
}
