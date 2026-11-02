import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '..', '.env') })

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { connectDB, isConnected } from './config/db.js'
import { projectsRouter } from './routes/projects.js'
import { contactRouter } from './routes/contact.js'
import { chatRouter } from './routes/chat.js'
import { adminAuthRouter } from './routes/adminAuth.js'
import { adminContentRouter } from './routes/adminContent.js'
import { adminInboxRouter } from './routes/adminInbox.js'
import { publicContentRouter } from './routes/publicContent.js'
import { adminMediaRouter } from './routes/adminMedia.js'

const app = express()
const PORT = process.env.PORT ?? 5001
if (process.env.NODE_ENV === 'production') app.set('trust proxy', 1)

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true)
      // Allow localhost for development
      if (
        process.env.NODE_ENV !== 'production' &&
        /^http:\/\/localhost(:\d+)?$/.test(origin)
      )
        return callback(null, true)
      // Allow explicitly configured client URL
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)
        return callback(null, true)
      callback(new Error(`CORS: origin ${origin} not allowed`))
    },
    credentials: true,
  })
)
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.json())

app.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API — use /api/health, /api/projects, /api/contact',
  })
})

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    message: 'Portfolio API running',
    db: isConnected() ? 'connected' : 'disconnected',
  })
})

app.use('/api/projects', projectsRouter)
app.use('/api/contact', contactRouter)
app.use('/api/chat', chatRouter)
app.use('/api/admin/auth', adminAuthRouter)
app.use('/api/admin/content', adminContentRouter)
app.use('/api/admin/inbox', adminInboxRouter)
app.use('/api/admin/media', adminMediaRouter)
app.use('/api/public', publicContentRouter)

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.info(`Server running on http://localhost:${PORT}`)
  })
}

start().catch(console.error)
