export interface Project {
  _id: string
  title: string
  description: string
  imageUrl?: string
  liveUrl?: string
  repoUrl?: string
  techStack?: string[]
  order?: number
}
