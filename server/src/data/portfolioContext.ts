import { resumeSkills } from './resumeSkills.js'

export const portfolioAbout = {
  name: 'Amar',
  title: 'Full Stack Developer',
  bio: 'Passionate about building clean, efficient web applications. I enjoy turning complex problems into simple solutions through code.',
  email: 'amarkumarsbg13@gmail.com',
  github: 'https://github.com/amarkumarsbg',
  linkedin: 'https://www.linkedin.com/in/amarkumarsbg/',
}

export const portfolioSkills = [
  ...resumeSkills.map((skill) => skill.name),
  'Redux',
  'Socket.io',
  'Docker',
  'GraphQL',
  'React Native',
  'AI',
  'Gemini',
  'LangChain',
  'Prompt Eng.',
]

export function buildRAGContext(
  projects: {
    title: string
    description: string
    techStack: string[]
    liveUrl?: string
    repoUrl?: string
  }[],
  about = portfolioAbout,
  skills: string[] = portfolioSkills,
  experience: {
    role: string
    company?: string
    period?: string
    description?: string
    tech?: string[]
  }[] = []
): string {
  const projectsText = projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description}. Tech: ${(p.techStack ?? []).join(', ')}. ${p.liveUrl ? `Live: ${p.liveUrl}` : ''} ${p.repoUrl ? `Repo: ${p.repoUrl}` : ''}`
    )
    .join('\n')

  const experienceText = experience
    .map(
      (e) =>
        `- ${e.role}${e.company ? ` at ${e.company}` : ''}${e.period ? ` (${e.period})` : ''}: ${e.description ?? ''}. Tech: ${(e.tech ?? []).join(', ')}`
    )
    .join('\n')
  return `
## About ${about.name}
- Title: ${about.title}
- Bio: ${about.bio}
- Email: ${about.email}
- GitHub: ${about.github}
- LinkedIn: ${about.linkedin}
- Experience: 4+ years

## Skills
${skills.join(', ')}

## Experience
${experienceText}

## Projects
${projectsText}
`.trim()
}
