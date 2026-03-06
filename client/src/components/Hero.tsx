import { useState, useEffect } from 'react'
import { dummyAbout } from '../data/dummy'

const roles = [
  'Full Stack Developer',
  'React Specialist',
  'Node.js Engineer',
  'Content Writer',
  'UI/UX Enthusiast',
  'Problem Solver',
]

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]

    if (!deleting && text === current) {
      const pause = setTimeout(() => setDeleting(true), 2000)
      return () => clearTimeout(pause)
    }

    if (deleting && text === '') {
      const next = setTimeout(() => {
        setDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles.length)
      }, 0)
      return () => clearTimeout(next)
    }

    const speed = deleting ? 40 : 80
    const timer = setTimeout(() => {
      setText(
        deleting
          ? current.slice(0, text.length - 1)
          : current.slice(0, text.length + 1)
      )
    }, speed)

    return () => clearTimeout(timer)
  }, [text, deleting, roleIndex])

  return (
    <section className="hero">
      <div className="hero-left">
        <span className="hero-badge">Available for work</span>
        <h1 className="hero-name">
          Hi, I&apos;m{' '}
          <span className="hero-name-gradient">{dummyAbout.name}</span>
        </h1>
        <p className="hero-title">
          <span className="typing-text">{text}</span>
          <span className="typing-cursor">|</span>
        </p>
        <p className="hero-bio">{dummyAbout.bio}</p>
        <div className="hero-cta">
          <a href="#projects">View Projects</a>
          <a href="#contact">Contact Me</a>
        </div>
        <div className="hero-socials">
          <a
            href={dummyAbout.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
          <a
            href={dummyAbout.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          <a href={`mailto:${dummyAbout.email}`} aria-label="Email">
            <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-code-card">
          <div className="code-card-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          <pre className="code-card-content">
            <code>
              <span className="code-keyword">const</span>{' '}
              <span className="code-var">developer</span> = {'{\n'}
              {'  '}
              <span className="code-key">name</span>:{' '}
              <span className="code-string">&quot;{dummyAbout.name}&quot;</span>
              ,{'\n'}
              {'  '}
              <span className="code-key">role</span>:{' '}
              <span className="code-string">
                &quot;{dummyAbout.title}&quot;
              </span>
              ,{'\n'}
              {'  '}
              <span className="code-key">skills</span>:{' '}
              <span className="code-bracket">[</span>
              <span className="code-string">&quot;React&quot;</span>,{' '}
              <span className="code-string">&quot;Node.js&quot;</span>,{' '}
              <span className="code-string">&quot;TypeScript&quot;</span>,{' '}
              <span className="code-string">&quot;AI&quot;</span>
              <span className="code-bracket">]</span>,{'\n'}
              {'  '}
              <span className="code-key">passion</span>:{' '}
              <span className="code-string">&quot;Building things&quot;</span>,
              {'\n'}
              {'  '}
              <span className="code-key">hireable</span>:{' '}
              <span className="code-bool">true</span>
              {'\n'}
              {'};'}
            </code>
          </pre>
        </div>
      </div>
    </section>
  )
}
