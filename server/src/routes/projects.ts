import { Router } from 'express'
import { ProjectModel } from '../models/Project.js'
import { isConnected } from '../config/db.js'

export const projectsRouter = Router()

projectsRouter.get('/', async (_req, res) => {
  try {
    if (!isConnected()) {
      res.json([])
      return
    }
    const projects = await ProjectModel.find().sort({ order: 1 })
    res.json(projects)
  } catch {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})
