import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { projectsRouter } from './routes/projects.js'
import { contactRouter } from './routes/contact.js'

const app = express()
const PORT = process.env.PORT ?? 5000

app.use(cors())
app.use(express.json())

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
