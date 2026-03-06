import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { projectsRouter } from './routes/projects.js'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = process.env.PORT ?? 5000

const allowedOrigins = [
  'http://localhost:5173',
  'https://my-portfolio-amarkumarsbg.vercel.app',
  process.env.CLIENT_URL,
].filter(Boolean) as string[]

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true)
      if (allowedOrigins.includes(origin)) return callback(null, true)
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
  res.json({ status: 'ok', message: 'Portfolio API running' })
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
