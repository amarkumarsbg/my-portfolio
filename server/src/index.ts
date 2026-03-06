import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB, isConnected } from './config/db.js'
import { projectsRouter } from './routes/projects.js'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = process.env.PORT ?? 5000

const allowedOrigins = ['http://localhost:5173', process.env.CLIENT_URL].filter(
  Boolean
) as string[]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin) return callback(null, true)
      // Allow all Vercel preview and production deployments
      if (origin.endsWith('.vercel.app')) return callback(null, true)
      // Allow localhost for development
      if (origin.startsWith('http://localhost')) return callback(null, true)
      // Allow explicitly configured client URL
      if (process.env.CLIENT_URL && origin === process.env.CLIENT_URL)
        return callback(null, true)
      callback(new Error(`CORS: origin ${origin} not allowed`))
    },
    credentials: true,
  })
)
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

async function start() {
  await connectDB()
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
  })
}

start().catch(console.error)
