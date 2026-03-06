export const portfolioAbout = {
  name: 'Amar',
  title: 'Full Stack Developer',
  bio: 'Passionate about building clean, efficient web applications. I enjoy turning complex problems into simple solutions through code.',
  email: 'amarkumarsbg13@gmail.com',
  github: 'https://github.com/amarkumarsbg',
  linkedin: 'https://www.linkedin.com/in/amarkumarsbg/',
}

export const portfolioSkills = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express',
  'MongoDB',
  'Redux',
  'Socket.io',
  'Tailwind CSS',
  'Docker',
  'AWS',
  'GraphQL',
  'REST APIs',
  'Git',
  'React Native',
  'AI',
]

export function buildRAGContext(
  projects: {
    title: string
    description: string
    techStack: string[]
    liveUrl?: string
    repoUrl?: string
  }[]
): string {
  const projectsText = projects
    .map(
      (p) =>
        `- ${p.title}: ${p.description}. Tech: ${(p.techStack ?? []).join(', ')}. ${p.liveUrl ? `Live: ${p.liveUrl}` : ''} ${p.repoUrl ? `Repo: ${p.repoUrl}` : ''}`
    )
    .join('\n')

  return `
## About ${portfolioAbout.name}
- Title: ${portfolioAbout.title}
- Bio: ${portfolioAbout.bio}
- Email: ${portfolioAbout.email}
- GitHub: ${portfolioAbout.github}
- LinkedIn: ${portfolioAbout.linkedin}
- Experience: 4+ years

## Skills
${portfolioSkills.join(', ')}

## Projects
${projectsText}
`.trim()
}
