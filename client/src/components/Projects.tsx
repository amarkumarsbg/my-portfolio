import { dummyProjects } from '../data/dummy'
import { ProjectCard } from './ProjectCard'

export function Projects() {
  return (
    <section className="section" id="projects">
      <h2 className="section-title">Projects</h2>
      <div className="projects-grid">
        {dummyProjects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </section>
  )
}
