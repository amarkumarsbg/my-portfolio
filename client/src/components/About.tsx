import { dummyAbout } from '../data/dummy'

export function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title">About Me</h2>
      <div className="about-content">
        <p>{dummyAbout.bio}</p>
        <div className="about-links">
          <a href={`mailto:${dummyAbout.email}`}>Email</a>
          <a href={dummyAbout.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={dummyAbout.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
