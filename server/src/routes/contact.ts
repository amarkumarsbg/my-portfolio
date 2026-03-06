import { Router } from 'express'
import { ContactModel } from '../models/Contact.js'
import { isConnected } from '../config/db.js'

export const contactRouter = Router()

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
    const contact = await ContactModel.create({ name, email, message })
    res.status(201).json(contact)
  } catch {
    res.status(500).json({ error: 'Failed to save message' })
  }
})
