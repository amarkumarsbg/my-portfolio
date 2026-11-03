import { Router } from 'express'
import Groq from 'groq-sdk'
import { ProjectModel } from '../models/Project.js'
import { isConnected } from '../config/db.js'
import { buildRAGContext } from '../data/portfolioContext.js'
import { fallbackCmsContent } from '../data/cmsFallback.js'
import {
  SiteSettingsModel,
  SkillModel,
  ExperienceModel,
} from '../models/CmsContent.js'

export const chatRouter = Router()

const DEFAULT_SYSTEM_PROMPT = `You are a friendly AI assistant for this portfolio website. Answer questions about the owner's skills, experience, and projects using only the supplied context. Be concise (2-4 sentences). If asked about something outside the context, say you do not have that information and suggest the contact form.`

chatRouter.post('/', async (req, res) => {
  try {
    const apiKey = process.env.GROQ_API_KEY?.trim()
    if (!apiKey || /^(your[_ -].*|replace[_ -].*|placeholder)$/i.test(apiKey)) {
      res.status(503).json({
        error:
          'AI chat needs a valid Groq API key. Set GROQ_API_KEY in server/.env, then restart the API server.',
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

    let projects: {
      title: string
      description: string
      techStack: string[]
      liveUrl?: string
      repoUrl?: string
    }[] = []
    let settings: typeof fallbackCmsContent.settings =
      fallbackCmsContent.settings
    let skills = fallbackCmsContent.skills.map((skill) => skill.name)
    let experience: {
      role: string
      company?: string
      period?: string
      description?: string
      tech?: string[]
    }[] = fallbackCmsContent.experience
    if (isConnected()) {
      const [docs, savedSettings, savedSkills, savedExperience] =
        await Promise.all([
          ProjectModel.find({
            $or: [{ isPublished: true }, { isPublished: { $exists: false } }],
          })
            .sort({ order: 1 })
            .lean(),
          SiteSettingsModel.findOne({ key: 'site' }).lean(),
          SkillModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
          ExperienceModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
        ])
      projects = docs.map((d) => ({
        title: d.title,
        description: d.description,
        techStack: d.techStack ?? [],
        liveUrl: d.liveUrl,
        repoUrl: d.repoUrl,
      }))
      if (savedSettings) {
        settings = {
          ...settings,
          name: String(savedSettings.name ?? settings.name),
          title: String(savedSettings.title ?? settings.title),
          bio: String(savedSettings.bio ?? settings.bio),
          email: String(savedSettings.email ?? settings.email),
          github: String(savedSettings.github ?? settings.github),
          linkedin: String(savedSettings.linkedin ?? settings.linkedin),
          chatbotSystemPrompt: String(savedSettings.chatbotSystemPrompt ?? ''),
        }
      }
      if (savedSkills.length)
        skills = savedSkills.map((skill) => String(skill.name ?? ''))
      if (savedExperience.length)
        experience = savedExperience.map((item) => ({
          role: String(item.role ?? ''),
          company: String(item.company ?? ''),
          period: String(item.period ?? ''),
          description: String(item.description ?? ''),
          tech: Array.isArray(item.tech) ? item.tech.map(String) : [],
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

    const context = buildRAGContext(projects, settings, skills, experience)
    const systemPrompt =
      settings.chatbotSystemPrompt?.trim() || DEFAULT_SYSTEM_PROMPT
    const groq = new Groq({ apiKey })
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [
        {
          role: 'system',
          content: `${systemPrompt}\n\nUse the following portfolio context as your only source of facts:\n${context}`,
        },
        { role: 'user', content: trimmed },
      ],
      max_tokens: 256,
    })

    const raw = completion.choices[0]?.message?.content
    const text = (typeof raw === 'string' ? raw : '').trim()
    res.json({ reply: text || 'Sorry, I could not generate a response.' })
  } catch (err) {
    const status =
      typeof err === 'object' && err !== null && 'status' in err
        ? Number(err.status)
        : 0
    if (status === 401 || status === 403) {
      res.status(503).json({
        error:
          'The Groq API key was rejected. Check GROQ_API_KEY in server/.env, then restart the API server.',
      })
      return
    }
    if (status === 429) {
      res.status(503).json({
        error: 'The AI assistant is busy right now. Please try again shortly.',
      })
      return
    }
    console.error(
      'Chat request failed:',
      err instanceof Error ? err.message : 'Unknown error'
    )
    res.status(500).json({
      error:
        'The AI assistant could not reply right now. Please try again shortly.',
    })
  }
})
