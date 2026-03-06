import type { Project } from '../types/project'
import { config } from '../config/env'

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${config.apiUrl}/projects`)
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}
