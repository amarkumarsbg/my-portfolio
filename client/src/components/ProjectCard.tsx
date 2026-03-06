import type { Project } from '../types/project'

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      {project.imageUrl && (
        <img
          src={project.imageUrl}
          alt={project.title}
          className="project-image"
        />
      )}
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        {project.techStack && project.techStack.length > 0 && (
          <ul className="tech-list">
            {project.techStack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        )}
        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live
            </a>
          )}
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              Repo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
