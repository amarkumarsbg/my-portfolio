import { Router } from 'express'
import { Resend } from 'resend'
import { ContactModel } from '../models/Contact.js'
import { isConnected } from '../config/db.js'

export const contactRouter = Router()

function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[character] ?? character
  )
}

function sendEmailBackground(name: string, email: string, message: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('Email skipped: RESEND_API_KEY not set in environment')
    return
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message)

  resend.emails
    .send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.GMAIL_USER ?? 'amarkumarsbg13@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
          <h2 style="color: #1d4ed8; margin-bottom: 4px;">New Contact Form Submission</h2>
          <p style="color: #6b7280; margin-top: 0; margin-bottom: 24px; font-size: 14px;">From your portfolio website</p>
          <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
            <tr style="background: #eff6ff;">
              <td style="padding: 12px 16px; font-weight: bold; color: #374151; width: 100px;">Name</td>
              <td style="padding: 12px 16px; color: #111827;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 16px; font-weight: bold; color: #374151;">Email</td>
              <td style="padding: 12px 16px;"><a href="mailto:${safeEmail}" style="color: #1d4ed8;">${safeEmail}</a></td>
            </tr>
            <tr style="background: #eff6ff;">
              <td style="padding: 12px 16px; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
              <td style="padding: 12px 16px; color: #111827; white-space: pre-wrap;">${safeMessage}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 13px; color: #9ca3af;">
            Reply to this email to respond directly to ${safeEmail}
          </p>
        </div>
      `,
    })
    .then(() =>
      console.info(`Email sent via Resend to ${process.env.GMAIL_USER}`)
    )
    .catch((err: Error) => console.error('Email send failed:', err.message))
}

contactRouter.post('/', async (req, res) => {
  try {
    if (!isConnected()) {
      res.status(503).json({ error: 'Database not connected' })
      return
    }

    const name = typeof req.body?.name === 'string' ? req.body.name.trim() : ''
    const email =
      typeof req.body?.email === 'string' ? req.body.email.trim() : ''
    const message =
      typeof req.body?.message === 'string' ? req.body.message.trim() : ''
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' })
      return
    }
    if (
      name.length > 100 ||
      email.length > 254 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      res.status(400).json({
        error: 'Please check the name, email, and message lengths and format',
      })
      return
    }

    const contact = await ContactModel.create({ name, email, message })

    // Respond immediately — email sends in background
    res.status(201).json(contact)

    // Fire and forget
    sendEmailBackground(name, email, message)
  } catch {
    res.status(500).json({ error: 'Failed to save message' })
  }
})
