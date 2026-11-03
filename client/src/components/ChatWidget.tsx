import { useState, useRef, useEffect } from 'react'
import { config } from '../config/env'
import { usePortfolioData } from '../context/PortfolioData'

type Message = { role: 'user' | 'assistant'; content: string }

const WELCOME =
  "Hi! I'm Amar's AI assistant. Ask me anything about his experience, skills, projects, or how to get in touch."

export function ChatWidget() {
  const { settings } = usePortfolioData()
  const welcome = settings.chatbotWelcomeMessage || WELCOME
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: WELCOME },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMessages((current) =>
      current.length === 1 && current[0].role === 'assistant'
        ? [{ role: 'assistant', content: welcome }]
        : current
    )
  }, [welcome])

  useEffect(() => {
    if (open && listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [open, messages])

  async function handleSend() {
    const text = input.trim()
    if (!text || loading) return

    setInput('')
    setMessages((prev) => [...prev, { role: 'user', content: text }])
    setLoading(true)

    try {
      const res = await fetch(`${config.apiUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error ?? 'Failed to get response')
      }

      const reply = (data.reply ?? data.message ?? '').toString().trim()
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: reply || 'Sorry, I could not generate a response.',
        },
      ])
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            err instanceof Error
              ? err.message
              : 'Something went wrong. Please try again.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className={`chat-widget ${open ? 'chat-widget--open' : ''}`}>
        <div className="chat-widget-panel">
          <div className="chat-widget-header">
            <div className="chat-widget-header-info">
              <div className="chat-widget-avatar-wrap">
                <span className="chat-widget-avatar">A</span>
                <span className="chat-widget-status" aria-hidden />
              </div>
              <div>
                <span className="chat-widget-title">Ask Amar</span>
                <span className="chat-widget-subtitle">
                  AI Assistant · Online
                </span>
              </div>
            </div>
            <button
              className="chat-widget-close"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="20"
                height="20"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="chat-widget-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-message chat-message--${m.role}`}>
                {m.role === 'assistant' && (
                  <span className="chat-message-avatar">A</span>
                )}
                <div className="chat-message-bubble">
                  <p className="chat-message-text">{m.content}</p>
                </div>
              </div>
            ))}
            {loading && (
              <div
                className="chat-message chat-message--assistant"
                role="status"
                aria-label="Amar's assistant is thinking"
              >
                <span className="chat-message-avatar">A</span>
                <div className="chat-message-bubble chat-message-bubble--typing">
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                  <span className="chat-typing-dot" />
                </div>
              </div>
            )}
          </div>

          <form
            className="chat-widget-input-wrap"
            onSubmit={(e) => {
              e.preventDefault()
              handleSend()
            }}
          >
            <input
              type="text"
              className="chat-widget-input"
              placeholder="Ask about experience, projects..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-widget-send"
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="20"
                height="20"
              >
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>

        <button
          className="chat-widget-toggle"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close chat' : 'Open AI chat'}
        >
          {open ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="24"
              height="24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="24"
              height="24"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </>
  )
}
