import type { Project } from '../types/project'

// These are GitHub repository creation years, not the date the CMS card was added.
const githubRepoYears: Record<string, number> = {
  'mern-blog': 2024,
  'chat-app': 2024,
  movix: 2024,
  'food-del': 2024,
  'netflix-clone': 2024,
  'gemini-clone': 2024,
  'my-detail-os-website': 2026,
  'my-detail-os-backend': 2026,
  'my-detail-os-admin': 2026,
  'my-detail-os-frontend': 2026,
}

export function getProjectYear(project: Project): number | undefined {
  if (project.year && Number.isInteger(project.year)) return project.year

  if (project.repoUrl) {
    try {
      const repo = new URL(project.repoUrl).pathname
        .split('/')
        .filter(Boolean)
        .at(-1)
        ?.toLowerCase()
      if (repo && githubRepoYears[repo]) return githubRepoYears[repo]
    } catch {
      // Ignore an invalid optional repository URL.
    }
  }

  const host = project.liveUrl
    ? (() => {
        try {
          return new URL(project.liveUrl).hostname.replace(/^www\./, '')
        } catch {
          return ''
        }
      })()
    : ''
  if (host === 'mydetailos.com') return 2026
  // No public SK Academy repository is available; year confirmed by the user.
  if (host === 'skacademy.net') return 2026

  return undefined
}

export function sortProjectsNewestFirst(projects: Project[]): Project[] {
  return projects
    .map((project, index) => ({
      project,
      index,
      year: getProjectYear(project),
    }))
    .sort((a, b) => {
      if (a.year !== undefined || b.year !== undefined) {
        if (a.year === undefined) return 1
        if (b.year === undefined) return -1
        if (a.year !== b.year) return b.year - a.year
      }
      return a.index - b.index
    })
    .map(({ project }) => project)
}
