import { Router } from 'express'
import Groq from 'groq-sdk'
import { ProjectModel } from '../models/Project.js'
import { isConnected } from '../config/db.js'
import { buildRAGContext } from '../data/portfolioContext.js'

export const chatRouter = Router()

const SYSTEM_PROMPT = `You are a friendly AI assistant for Amar's portfolio website. You answer questions about Amar, his skills, experience, and projects. Use ONLY the context below. Be concise (2-4 sentences). If asked something not in the context, say you don't have that information and suggest they use the contact form.`

chatRouter.post('/', async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY
    if (!apiKey) {
      res.status(503).json({
        error: 'AI chat is not configured. Add GROQ_API_KEY to environment.',
      })
      return
    }

    const { message } = req.body
    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' })
      return
    }

    const trimmed = message.trim().slice(0, 500)
    if (!trimmed) {
      res.status(400).json({ error: 'Message cannot be empty' })
      return
    }

    // Build RAG context: fetch projects from DB if connected, else use fallback
    let projects: {
      title: string
      description: string
      techStack: string[]
      liveUrl?: string
      repoUrl?: string
    }[] = []
    if (isConnected()) {
      const docs = await ProjectModel.find().sort({ order: 1 }).lean()
      projects = docs.map((d) => ({
        title: d.title,
        description: d.description,
        techStack: d.techStack ?? [],
        liveUrl: d.liveUrl,
        repoUrl: d.repoUrl,
      }))
    } else {
      projects = [
        {
          title: 'MERN Blog',
          description: 'Full-stack blogging platform with auth and CRUD.',
          techStack: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],
          repoUrl: 'https://github.com/amarkumarsbg/mern-blog',
        },
        {
          title: 'Chat App',
          description: 'Real-time messaging with Socket.io.',
          techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
          liveUrl: 'https://chat-app-50ne.onrender.com/',
          repoUrl: 'https://github.com/amarkumarsbg/chat-app',
        },
        {
          title: 'Movix',
          description: 'Movie discovery app with TMDB API.',
          techStack: ['React', 'Redux', 'TMDB API'],
          repoUrl: 'https://github.com/amarkumarsbg/movix',
        },
        {
          title: 'Food Delivery',
          description: 'Online food ordering platform.',
          techStack: ['React', 'Node.js', 'MongoDB', 'Express'],
          repoUrl: 'https://github.com/amarkumarsbg/food-del',
        },
        {
          title: 'Netflix Clone',
          description: 'Netflix-inspired streaming UI.',
          techStack: ['React', 'TMDB API', 'CSS'],
          liveUrl: 'https://netflix-clone-three-flax.vercel.app',
          repoUrl: 'https://github.com/amarkumarsbg/netflix-clone',
        },
        {
          title: 'Gemini Clone',
          description: 'Google Gemini AI clone.',
          techStack: ['React', 'AI', 'API'],
          liveUrl: 'https://gemini-clone-five.vercel.app',
          repoUrl: 'https://github.com/amarkumarsbg/gemini-clone',
        },
      ]
    }

    const context = buildRAGContext(projects)
    const prompt = `${SYSTEM_PROMPT}\n\n## Context\n${context}\n\n## User question\n${trimmed}`

    const groq = new Groq({ apiKey })
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 256,
    })

    const raw = completion.choices[0]?.message?.content
    const text = (typeof raw === 'string' ? raw : '').trim()
    res.json({ reply: text || 'Sorry, I could not generate a response.' })
  } catch (err) {
    console.error('Chat error:', err)
    res.status(500).json({
      error: 'Failed to get AI response. Please try again.',
    })
  }
})
