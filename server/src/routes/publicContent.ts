import { Router } from 'express'
import { isConnected } from '../config/db.js'
import { fallbackCmsContent } from '../data/cmsFallback.js'
import { ProjectModel } from '../models/Project.js'
import {
  BlogPostModel,
  CertificationModel,
  ExperienceModel,
  ServiceModel,
  SiteSettingsModel,
  SkillModel,
  TestimonialModel,
} from '../models/CmsContent.js'

export const publicContentRouter = Router()

publicContentRouter.get('/content', async (_req, res) => {
  if (!isConnected())
    return res.json({ ...fallbackCmsContent, source: 'fallback' })
  try {
    const [
      settings,
      projects,
      skills,
      services,
      experience,
      certifications,
      testimonials,
      blog,
      projectTotal,
      skillTotal,
      serviceTotal,
      experienceTotal,
      certificationTotal,
      testimonialTotal,
      blogTotal,
    ] = await Promise.all([
      SiteSettingsModel.findOne({ key: 'site' }).lean(),
      ProjectModel.find({
        $or: [{ isPublished: true }, { isPublished: { $exists: false } }],
      })
        .sort({ order: 1 })
        .lean(),
      SkillModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
      ServiceModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
      ExperienceModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
      CertificationModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
      TestimonialModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
      BlogPostModel.find({ isPublished: true }).sort({ order: 1 }).lean(),
      ProjectModel.countDocuments(),
      SkillModel.countDocuments(),
      ServiceModel.countDocuments(),
      ExperienceModel.countDocuments(),
      CertificationModel.countDocuments(),
      TestimonialModel.countDocuments(),
      BlogPostModel.countDocuments(),
    ])
    const hasDatabaseContent = Boolean(
      settings ||
      projectTotal ||
      skillTotal ||
      serviceTotal ||
      experienceTotal ||
      certificationTotal ||
      testimonialTotal ||
      blogTotal
    )
    const fallback = fallbackCmsContent
    const featuredFallback = fallback.projects.slice(0, 2)
    const databaseProjectUrls = new Set(
      projects.map((project) => project.liveUrl).filter(Boolean)
    )
    const projectsWithFeaturedFallback = [
      ...featuredFallback.filter(
        (project) => !databaseProjectUrls.has(project.liveUrl)
      ),
      ...projects,
    ]
    const resumeExperience = fallback.experience
    const legacyExperienceCompanies = new Set([
      'Freelance / Self-Employed',
      'Open Source Contributor',
      'Self-Directed Learning',
      'Suvit Fintech Pvt. Ltd.',
    ])
    const databaseExperience = experience.filter(
      (entry) => !legacyExperienceCompanies.has(String(entry.company ?? ''))
    )
    const databaseExperienceKeys = new Set(
      databaseExperience.map((entry) => `${entry.company}|${entry.period}`)
    )
    const experienceWithResume = [
      ...resumeExperience.filter(
        (entry) =>
          !databaseExperienceKeys.has(`${entry.company}|${entry.period}`)
      ),
      ...databaseExperience,
    ]
    const skillKey = (name: string) => {
      const normalized = name.trim().toLowerCase()
      if (normalized === 'express') return 'express.js'
      if (normalized === 'prisma') return 'prisma orm'
      if (normalized === 'cursor ai') return 'cursor'
      return normalized
    }
    const databaseSkillKeys = new Set(
      skills.map((skill) => skillKey(String(skill.name ?? '')))
    )
    const skillsWithResume = [
      ...skills,
      ...fallback.skills.filter(
        (skill) => !databaseSkillKeys.has(skillKey(skill.name))
      ),
    ].sort((a, b) => Number(a.order) - Number(b.order))
    res.json({
      settings: settings
        ? { ...fallback.settings, ...settings }
        : fallback.settings,
      projects: projectTotal ? projectsWithFeaturedFallback : fallback.projects,
      skills: skillTotal ? skillsWithResume : fallback.skills,
      services: serviceTotal ? services : fallback.services,
      experience: experienceTotal ? experienceWithResume : fallback.experience,
      certifications: certificationTotal
        ? certifications
        : fallback.certifications,
      testimonials: testimonialTotal ? testimonials : fallback.testimonials,
      blog: blogTotal ? blog : fallback.blog,
      source: hasDatabaseContent ? 'database' : 'fallback',
    })
  } catch {
    res.json({ ...fallbackCmsContent, source: 'fallback' })
  }
})
