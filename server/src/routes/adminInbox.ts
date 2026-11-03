import { Router } from 'express'
import { isConnected } from '../config/db.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'
import { ContactModel } from '../models/Contact.js'

export const adminInboxRouter = Router()
adminInboxRouter.use(requireAdminAuth)

const statuses = ['unread', 'read', 'replied', 'archived'] as const

adminInboxRouter.get('/', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const status = typeof req.query.status === 'string' ? req.query.status : ''
  const query =
    typeof req.query.q === 'string' ? req.query.q.trim().slice(0, 100) : ''
  const clauses: Record<string, unknown>[] = []
  if (status === 'unread')
    clauses.push({
      $or: [{ status: 'unread' }, { status: { $exists: false } }],
    })
  else if (statuses.includes(status as (typeof statuses)[number]))
    clauses.push({ status })
  if (query) {
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    clauses.push({
      $or: [
        { name: { $regex: escaped, $options: 'i' } },
        { email: { $regex: escaped, $options: 'i' } },
        { message: { $regex: escaped, $options: 'i' } },
      ],
    })
  }
  const filter = clauses.length ? { $and: clauses } : {}
  const [messages, unread] = await Promise.all([
    ContactModel.find(filter).sort({ createdAt: -1 }).lean(),
    ContactModel.countDocuments({
      $or: [{ status: 'unread' }, { status: { $exists: false } }],
    }),
  ])
  res.json({ messages, unread })
})

adminInboxRouter.patch('/:id/status', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const status = req.body?.status
  if (!statuses.includes(status))
    return res.status(400).json({ error: 'Invalid message status' })
  const message = await ContactModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  )
  if (!message) return res.status(404).json({ error: 'Message not found' })
  res.json(message)
})

adminInboxRouter.delete('/:id', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  try {
    const message = await ContactModel.findByIdAndDelete(req.params.id)
    if (!message) return res.status(404).json({ error: 'Message not found' })
    res.status(204).end()
  } catch {
    res.status(400).json({ error: 'Invalid message ID' })
  }
})
