import { Router } from 'express'
import nodemailer from 'nodemailer'
import { ContactModel } from '../models/Contact.js'
import { isConnected } from '../config/db.js'

export const contactRouter = Router()

function createTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })
}

contactRouter.post('/', async (req, res) => {
  try {
    if (!isConnected()) {
      res
        .status(503)
        .json({ error: 'Database not connected. Add MONGODB_URI to .env' })
      return
    }

    const { name, email, message } = req.body
    if (!name || !email || !message) {
      res.status(400).json({ error: 'Name, email, and message are required' })
      return
    }

    // Save to MongoDB
    const contact = await ContactModel.create({ name, email, message })

    // Send email notification if credentials are configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.warn(
        'Email skipped: GMAIL_USER or GMAIL_APP_PASSWORD not set in environment'
      )
    } else {
      try {
        const transporter = createTransporter()
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
          to: process.env.GMAIL_USER,
          replyTo: email,
          subject: `New message from ${name} — Portfolio`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #1d4ed8; margin-bottom: 4px;">New Contact Form Submission</h2>
              <p style="color: #6b7280; margin-top: 0; margin-bottom: 24px; font-size: 14px;">From your portfolio website</p>

              <table style="width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 1px 4px rgba(0,0,0,0.08);">
                <tr style="background: #eff6ff;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #374151; width: 100px;">Name</td>
                  <td style="padding: 12px 16px; color: #111827;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; font-weight: bold; color: #374151;">Email</td>
                  <td style="padding: 12px 16px;"><a href="mailto:${email}" style="color: #1d4ed8;">${email}</a></td>
                </tr>
                <tr style="background: #eff6ff;">
                  <td style="padding: 12px 16px; font-weight: bold; color: #374151; vertical-align: top;">Message</td>
                  <td style="padding: 12px 16px; color: #111827; white-space: pre-wrap;">${message}</td>
                </tr>
              </table>

              <p style="margin-top: 20px; font-size: 13px; color: #9ca3af;">
                You can reply directly to this email — it will go to ${email}
              </p>
            </div>
          `,
        })
        console.log(`Email sent to ${process.env.GMAIL_USER}`)
      } catch (emailErr) {
        // Email failed but message was saved — log but don't fail the request
        console.error('Email send failed:', emailErr)
      }
    }

    res.status(201).json(contact)
  } catch {
    res.status(500).json({ error: 'Failed to save message' })
  }
})
