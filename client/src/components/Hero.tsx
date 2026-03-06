import { dummyAbout } from '../data/dummy'

export function Hero() {
  return (
    <section className="hero">
      <h1>{dummyAbout.name}</h1>
      <p className="hero-title">{dummyAbout.title}</p>
      <p className="hero-bio">{dummyAbout.bio}</p>
      <div className="hero-cta">
        <a href="#projects">View Projects</a>
        <a href="#contact">Contact</a>
      </div>
    </section>
  )
}
