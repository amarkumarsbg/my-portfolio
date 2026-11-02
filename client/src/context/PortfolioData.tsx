import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { config } from '../config/env'
import { dummyAbout, dummyProjects } from '../data/dummy'
import type { Project } from '../types/project'

export type SiteSettings = typeof dummyAbout & {
  avatarUrl?: string
  resumeUrl?: string
  seoTitle?: string
  seoDescription?: string
  chatbotSystemPrompt?: string
  chatbotWelcomeMessage?: string
}

export type CmsEntry = Record<string, unknown> & {
  _id: string
  order?: number
  isPublished?: boolean
}

type PortfolioContent = {
  settings: SiteSettings
  projects: Project[]
  skills: CmsEntry[]
  services: CmsEntry[]
  experience: CmsEntry[]
  certifications: CmsEntry[]
  testimonials: CmsEntry[]
  blog: CmsEntry[]
  source: 'fallback' | 'database'
}

const initial: PortfolioContent = {
  settings: { ...dummyAbout, resumeUrl: '/resume.pdf' },
  projects: dummyProjects,
  skills: [],
  services: [],
  experience: [],
  certifications: [],
  testimonials: [],
  blog: [],
  source: 'fallback',
}

const PortfolioDataContext = createContext<PortfolioContent>(initial)

export function PortfolioDataProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState(initial)
  useEffect(() => {
    let active = true
    const refresh = () => {
      fetch(`${config.apiUrl}/public/content`)
        .then((response) => (response.ok ? response.json() : null))
        .then((data) => {
          if (!active || !data) return
          setContent((current) => ({
            ...current,
            ...data,
            settings: { ...current.settings, ...data.settings },
          }))
        })
        .catch(() => undefined)
    }
    const onStorage = (event: StorageEvent) => {
      if (event.key === 'portfolio-cms-updated-at') refresh()
    }
    refresh()
    window.addEventListener('storage', onStorage)
    return () => {
      active = false
      window.removeEventListener('storage', onStorage)
    }
  }, [])
  useEffect(() => {
    document.title =
      content.settings.seoTitle ||
      `${content.settings.name} — ${content.settings.title} Portfolio`
    let description = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    )
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.append(description)
    }
    description.content =
      content.settings.seoDescription || content.settings.bio
  }, [content.settings])
  return (
    <PortfolioDataContext.Provider value={content}>
      {children}
    </PortfolioDataContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePortfolioData() {
  return useContext(PortfolioDataContext)
}
