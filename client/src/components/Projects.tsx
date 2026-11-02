import { useState } from 'react'
import { dummyProjects, dummyAbout } from '../data/dummy'
import { ProjectCard } from './ProjectCard'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { usePortfolioData } from '../context/PortfolioData'

export function Projects() {
  const [filter, setFilter] = useState('All')
  const headerRef = useScrollReveal<HTMLDivElement>()
  const { projects, settings, source } = usePortfolioData()
  const displayedProjects = source === 'database' ? projects : dummyProjects
  const allTechs = [
    'All',
    ...Array.from(new Set(displayedProjects.flatMap((p) => p.techStack ?? []))),
  ]

  const filtered =
    filter === 'All'
      ? displayedProjects
      : displayedProjects.filter((p) => p.techStack?.includes(filter))

  return (
    <section className="section" id="projects">
      <div className="projects-header" ref={headerRef}>
        <div className="projects-header-text">
          <h2 className="section-title">Featured Projects</h2>
          <p className="projects-subtitle">
            A selection of projects I&apos;ve built — from full-stack apps to AI
            clones
          </p>
        </div>
        <a
          href={settings.github || dummyAbout.github}
          target="_blank"
          rel="noreferrer"
          className="projects-view-all"
        >
          View All on GitHub
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="16"
            height="16"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </a>
      </div>

      <div className="project-filters">
        {allTechs.map((tech) => (
          <button
            key={tech}
            className={`project-filter-btn ${filter === tech ? 'project-filter-btn--active' : ''}`}
            onClick={() => setFilter(tech)}
          >
            {tech}
          </button>
        ))}
      </div>

      <div className="projects-grid">
        {filtered.map((project, index) => (
          <ProjectCard key={project._id} project={project} index={index} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="projects-empty">No projects found for this filter.</p>
      )}

      <div className="projects-footer">
        <p className="projects-footer-text">
          75+ repositories on GitHub across full-stack, mobile, and AI projects
        </p>
        <a
          href={settings.github || dummyAbout.github}
          target="_blank"
          rel="noreferrer"
          className="projects-github-btn"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Explore All Projects
        </a>
      </div>
    </section>
  )
}
