import { Router } from 'express'
import { GoogleGenerativeAI } from '@google/generative-ai'
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
    const apiKey = process.env.GEMINI_API_KEY?.trim()
    if (!apiKey || /^(your[_ -].*|replace[_ -].*|placeholder)$/i.test(apiKey)) {
      res.status(503).json({
        error:
          'AI chat needs a valid Gemini API key. Set GEMINI_API_KEY in server/.env, then restart the API server.',
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
    const genAI = new GoogleGenerativeAI(apiKey)
    const systemInstruction = `${systemPrompt}\n\nUse the following portfolio context as your only source of facts:\n${context}`
    const candidateModels = [
      'gemini-2.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-3.8-flash',
    ]

    let text = ''
    let lastError: unknown = null

    for (const modelName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction,
          generationConfig: { maxOutputTokens: 256 },
        })
        const completion = await model.generateContent(trimmed)
        text = completion.response.text().trim()
        if (text) break
      } catch (err) {
        lastError = err
        const status =
          typeof err === 'object' && err !== null && 'status' in err
            ? Number(err.status)
            : 0
        // If credentials are bad, trying other models won't help
        if (status === 401 || status === 403) break
        // For 503 / 429 / overloaded models, try the next candidate
        continue
      }
    }

    if (!text && lastError) {
      throw lastError
    }

    res.json({ reply: text || 'Sorry, I could not generate a response.' })
  } catch (err) {
    const status =
      typeof err === 'object' && err !== null && 'status' in err
        ? Number(err.status)
        : 0
    if (status === 401 || status === 403) {
      res.status(503).json({
        error:
          'The Gemini API key was rejected. Check GEMINI_API_KEY in server/.env and confirm the key belongs to a project with Gemini API access.',
      })
      return
    }
    if (status === 429) {
      res.status(503).json({
        error:
          'Gemini free-tier limits were reached. Please wait and try again later.',
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
