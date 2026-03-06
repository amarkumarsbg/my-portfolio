import { useState, useCallback, type FormEvent } from 'react'
import { dummyAbout } from '../data/dummy'
import { config } from '../config/env'
import { Toast } from './Toast'

const contactMethods = [
  {
    title: 'Email',
    value: dummyAbout.email,
    href: `mailto:${dummyAbout.email}`,
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        width="24"
        height="24"
      >
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    title: 'LinkedIn',
    value: 'amarkumarsbg',
    href: dummyAbout.linkedin,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    title: 'GitHub',
    value: 'amarkumarsbg',
    href: dummyAbout.github,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
]

type ToastState = {
  visible: boolean
  message: string
  type: 'success' | 'error'
}

export function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  })

  const closeToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSending(true)

    try {
      const res = await fetch(`${config.apiUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error()

      setToast({
        visible: true,
        message: 'Message sent successfully!',
        type: 'success',
      })
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setToast({
        visible: true,
        message: 'Something went wrong. Please try again.',
        type: 'error',
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="contact-header">
        <h2 className="section-title">Get In Touch</h2>
        <p className="contact-subtitle">
          I&apos;m currently open to new opportunities. Whether you have a
          project in mind, a question, or just want to say hi — my inbox is
          always open.
        </p>
      </div>

      <div className="contact-layout">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="form-input"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-input"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              id="message"
              className="form-input form-textarea"
              placeholder="Tell me about your project or just say hi..."
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="form-submit" disabled={sending}>
            {sending ? (
              'Sending...'
            ) : (
              <>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="18"
                  height="18"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Send Message
              </>
            )}
          </button>
        </form>

        <div className="contact-sidebar">
          <h3 className="contact-sidebar-title">Or reach out directly</h3>
          <div className="contact-methods">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                target={method.title !== 'Email' ? '_blank' : undefined}
                rel={method.title !== 'Email' ? 'noreferrer' : undefined}
                className="contact-method"
              >
                <div className="contact-method-icon">{method.icon}</div>
                <div>
                  <p className="contact-method-label">{method.title}</p>
                  <p className="contact-method-value">{method.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        visible={toast.visible}
        onClose={closeToast}
      />
    </section>
  )
}
