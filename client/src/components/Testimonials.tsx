import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const testimonials = [
  {
    name: 'Rahul Sharma',
    role: 'Product Manager',
    text: 'Amar delivered an exceptional web application that exceeded our expectations. His attention to detail and clean code practices made the entire collaboration smooth and productive.',
    avatar: 'RS',
  },
  {
    name: 'Priya Verma',
    role: 'Startup Founder',
    text: 'Working with Amar was a great experience. He took our rough idea and turned it into a polished, production-ready application. Highly skilled in both frontend and backend.',
    avatar: 'PV',
  },
  {
    name: 'Vikram Patel',
    role: 'Senior Developer',
    text: "Amar is one of the most dedicated developers I've worked with. His ability to solve complex problems and deliver quality code on time is impressive.",
    avatar: 'VP',
  },
]

export function Testimonials() {
  const [active, setActive] = useState(0)
  const headerRef = useScrollReveal<HTMLDivElement>()
  const cardRef = useScrollReveal<HTMLDivElement>(0.15, 200)

  return (
    <section className="section" id="testimonials">
      <div ref={headerRef}>
        <h2 className="section-title">What People Say</h2>
        <p className="testimonials-subtitle">
          Feedback from colleagues and collaborators
        </p>
      </div>

      <div className="testimonials-container" ref={cardRef}>
        <div className="testimonial-card">
          <svg
            className="testimonial-quote"
            viewBox="0 0 24 24"
            fill="currentColor"
            width="40"
            height="40"
            opacity="0.15"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="testimonial-text">{testimonials[active].text}</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">
              {testimonials[active].avatar}
            </div>
            <div>
              <p className="testimonial-name">{testimonials[active].name}</p>
              <p className="testimonial-role">{testimonials[active].role}</p>
            </div>
          </div>
        </div>

        <div className="testimonial-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`testimonial-dot ${i === active ? 'testimonial-dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
