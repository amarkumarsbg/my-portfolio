import { Router } from 'express'
import { isConnected } from '../config/db.js'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'
import { ProjectModel } from '../models/Project.js'
import { ContactModel } from '../models/Contact.js'
import { fallbackCmsContent } from '../data/cmsFallback.js'
import { resumeSkills } from '../data/resumeSkills.js'
import mongoose from 'mongoose'
import {
  BlogPostModel,
  CertificationModel,
  ExperienceModel,
  ServiceModel,
  SiteSettingsModel,
  SkillModel,
  TestimonialModel,
} from '../models/CmsContent.js'

export const adminContentRouter = Router()
adminContentRouter.use(requireAdminAuth)

adminContentRouter.post('/sync-resume-experience', async (_req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })

  try {
    for (const entry of fallbackCmsContent.experience) {
      const { role, company, period, description, tech, order, isPublished } =
        entry
      await ExperienceModel.findOneAndUpdate(
        { company, period },
        {
          $set: { role, description, tech, order, isPublished },
          $setOnInsert: { company, period },
        },
        { upsert: true, new: true, runValidators: true }
      )
    }

    await ExperienceModel.deleteMany({
      company: {
        $in: [
          'Freelance / Self-Employed',
          'Open Source Contributor',
          'Self-Directed Learning',
          'Suvit Fintech Pvt. Ltd.',
        ],
      },
    })

    res.json({
      message: 'Resume experience updated and old placeholder entries removed.',
    })
  } catch {
    res.status(500).json({ error: 'Could not update resume experience' })
  }
})

adminContentRouter.post('/import-resume-skills', async (_req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })

  try {
    const aliases: Record<string, string[]> = {
      'Express.js': ['Express', 'Express.js'],
      Cursor: ['Cursor AI', 'Cursor'],
      'Prisma ORM': ['Prisma', 'Prisma ORM'],
    }
    for (const [order, skill] of resumeSkills.entries()) {
      const names = aliases[skill.name] ?? [skill.name]
      await SkillModel.findOneAndUpdate(
        { name: { $in: names } },
        {
          $set: {
            name: skill.name,
            category: skill.category,
            iconUrl: skill.iconUrl,
            order,
            isPublished: true,
          },
        },
        { upsert: true, new: true, runValidators: true }
      )
    }

    const existing = await SkillModel.find({
      name: { $nin: resumeSkills.map((skill) => skill.name) },
    })
      .sort({ order: 1, createdAt: 1 })
      .select('_id')
      .lean()
    if (existing.length) {
      await SkillModel.bulkWrite(
        existing.map((skill, index) => ({
          updateOne: {
            filter: { _id: skill._id },
            update: { $set: { order: resumeSkills.length + index } },
          },
        }))
      )
    }

    res.json({
      imported: resumeSkills.length,
      message: 'Resume skills added and categorized in your portfolio.',
    })
  } catch {
    res.status(500).json({ error: 'Could not import resume skills' })
  }
})

type GenericContentModel = mongoose.Model<Record<string, unknown>>
type ContentCollection = {
  model: GenericContentModel
  fields: readonly string[]
  required: readonly string[]
}

const collections: Record<string, ContentCollection> = {
  projects: {
    model: ProjectModel as unknown as GenericContentModel,
    fields: [
      'title',
      'description',
      'imageUrl',
      'liveUrl',
      'repoUrl',
      'techStack',
      'order',
      'isPublished',
      'isFeatured',
    ],
    required: ['title', 'description'],
  },
  skills: {
    model: SkillModel as GenericContentModel,
    fields: ['name', 'category', 'iconUrl', 'order', 'isPublished'],
    required: ['name'],
  },
  services: {
    model: ServiceModel as GenericContentModel,
    fields: ['title', 'description', 'iconSvg', 'order', 'isPublished'],
    required: ['title'],
  },
  experience: {
    model: ExperienceModel as GenericContentModel,
    fields: [
      'role',
      'company',
      'period',
      'description',
      'tech',
      'order',
      'isPublished',
    ],
    required: ['role'],
  },
  certifications: {
    model: CertificationModel as GenericContentModel,
    fields: [
      'title',
      'issuer',
      'year',
      'iconUrl',
      'credentialUrl',
      'order',
      'isPublished',
    ],
    required: ['title'],
  },
  testimonials: {
    model: TestimonialModel as GenericContentModel,
    fields: ['name', 'role', 'text', 'avatar', 'order', 'isPublished'],
    required: ['name'],
  },
  blog: {
    model: BlogPostModel as GenericContentModel,
    fields: [
      'title',
      'slug',
      'excerpt',
      'content',
      'date',
      'readTime',
      'tag',
      'coverImageUrl',
      'order',
      'isPublished',
    ],
    required: ['title', 'slug'],
  },
} as const

function getCollection(value: string) {
  return collections[value]
}

function pickFields(body: Record<string, unknown>, fields: readonly string[]) {
  return Object.fromEntries(
    fields
      .filter((field) => body[field] !== undefined)
      .map((field) => [field, body[field]])
  )
}

adminContentRouter.get('/settings', async (_req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const settings = await SiteSettingsModel.findOne({ key: 'site' }).lean()
  res.json(settings ?? {})
})

adminContentRouter.put('/settings', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const fields = [
    'name',
    'title',
    'bio',
    'email',
    'github',
    'linkedin',
    'avatarUrl',
    'resumeUrl',
    'seoTitle',
    'seoDescription',
    'chatbotSystemPrompt',
    'chatbotWelcomeMessage',
  ]
  try {
    const settings = await SiteSettingsModel.findOneAndUpdate(
      { key: 'site' },
      {
        $set: pickFields(req.body ?? {}, fields),
        $setOnInsert: { key: 'site' },
      },
      { new: true, upsert: true, runValidators: true }
    )
    res.json(settings)
  } catch {
    res.status(400).json({ error: 'Could not save site settings' })
  }
})

adminContentRouter.post('/seed-starter-content', async (_req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const result: Record<string, number> = {}
  if (!(await SiteSettingsModel.exists({ key: 'site' }))) {
    await SiteSettingsModel.create({
      ...fallbackCmsContent.settings,
      key: 'site',
    })
    result.settings = 1
  }
  const seedIfEmpty = async (
    name: string,
    model: GenericContentModel,
    records: readonly Record<string, unknown>[]
  ) => {
    if (await model.countDocuments()) return
    await model.insertMany(
      records.map((record) =>
        Object.fromEntries(
          Object.entries(record).filter(([key]) => key !== '_id')
        )
      )
    )
    result[name] = records.length
  }
  await seedIfEmpty(
    'projects',
    ProjectModel as unknown as GenericContentModel,
    fallbackCmsContent.projects
  )
  await seedIfEmpty('skills', SkillModel, fallbackCmsContent.skills)
  await seedIfEmpty('services', ServiceModel, fallbackCmsContent.services)
  await seedIfEmpty(
    'experience',
    ExperienceModel,
    fallbackCmsContent.experience
  )
  await seedIfEmpty(
    'certifications',
    CertificationModel,
    fallbackCmsContent.certifications
  )
  await seedIfEmpty(
    'testimonials',
    TestimonialModel,
    fallbackCmsContent.testimonials
  )
  await seedIfEmpty('blog', BlogPostModel, fallbackCmsContent.blog)
  await ContactModel.updateMany(
    { status: { $exists: false } },
    { $set: { status: 'unread' } }
  )
  res.json({
    seeded: result,
    message:
      'Starter content added to empty collections. Existing records were preserved.',
  })
})

adminContentRouter.post('/import-featured-projects', async (_req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })

  const featuredProjects = [
    {
      title: 'MyDetailOS — Workshop Management Platform',
      description:
        'A workshop platform connecting bookings, inspections, job cards, inventory, billing, staff workflows, and a customer portal.',
      imageUrl: '/projects/mydetailos-overview.png',
      liveUrl: 'https://www.mydetailos.com/',
      repoUrl: '',
      techStack: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'PostgreSQL',
        'Prisma',
      ],
    },
    {
      title: 'SK Academy — School Management System',
      description:
        'A full-stack school platform pairing a public admissions and information site with a staff portal for site content, student records, and admission inquiries.',
      imageUrl:
        'https://res.cloudinary.com/drlpwb53a/image/upload/v1783538312/sk-academy/images/wduka7m9tzycgatgthmt.jpg',
      liveUrl: 'https://www.skacademy.net/',
      repoUrl: '',
      techStack: [
        'Next.js',
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Node.js',
        'Express',
        'MongoDB',
        'Mongoose',
      ],
    },
  ]

  try {
    for (const [order, project] of featuredProjects.entries()) {
      await ProjectModel.findOneAndUpdate(
        { liveUrl: project.liveUrl },
        {
          $setOnInsert: project,
          $set: { order, isFeatured: true, isPublished: true },
        },
        { upsert: true, new: true, runValidators: true }
      )
    }

    const featuredUrls = featuredProjects.map((project) => project.liveUrl)
    const remaining = await ProjectModel.find({
      liveUrl: { $nin: featuredUrls },
    })
      .sort({ order: 1, createdAt: 1 })
      .select('_id')
      .lean()
    if (remaining.length) {
      await ProjectModel.bulkWrite(
        remaining.map((project, index) => ({
          updateOne: {
            filter: { _id: project._id },
            update: { $set: { order: index + featuredProjects.length } },
          },
        }))
      )
    }

    res.json({
      imported: featuredProjects.length,
      message:
        'Featured projects are ready and now appear first on your portfolio.',
    })
  } catch {
    res.status(500).json({ error: 'Could not import featured projects' })
  }
})

adminContentRouter.get('/:type', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const collection = getCollection(req.params.type)
  if (!collection)
    return res.status(404).json({ error: 'Unknown content type' })
  const entries = await collection.model
    .find()
    .sort({ order: 1, createdAt: 1 })
    .lean()
  res.json(entries)
})

adminContentRouter.post('/:type', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const collection = getCollection(req.params.type)
  if (!collection)
    return res.status(404).json({ error: 'Unknown content type' })
  const data = pickFields(req.body ?? {}, collection.fields)
  const missing = collection.required.some(
    (field) => !String(data[field] ?? '').trim()
  )
  if (missing)
    return res.status(400).json({ error: 'Complete the required fields' })
  try {
    const entry = await collection.model.create(data)
    res.status(201).json(entry)
  } catch (error) {
    res.status(400).json({
      error:
        error instanceof Error ? error.message : 'Could not create content',
    })
  }
})

adminContentRouter.patch('/:type/:id', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const collection = getCollection(req.params.type)
  if (!collection)
    return res.status(404).json({ error: 'Unknown content type' })
  try {
    const entry = await collection.model.findByIdAndUpdate(
      req.params.id,
      { $set: pickFields(req.body ?? {}, collection.fields) },
      { new: true, runValidators: true }
    )
    if (!entry) return res.status(404).json({ error: 'Content not found' })
    res.json(entry)
  } catch {
    res.status(400).json({ error: 'Could not update content' })
  }
})

adminContentRouter.delete('/:type/:id', async (req, res) => {
  if (!isConnected())
    return res.status(503).json({ error: 'Database not connected' })
  const collection = getCollection(req.params.type)
  if (!collection)
    return res.status(404).json({ error: 'Unknown content type' })
  const removed = await collection.model.findByIdAndDelete(req.params.id)
  if (!removed) return res.status(404).json({ error: 'Content not found' })
  res.status(204).end()
})

adminContentRouter.get('/dashboard/metrics', async (_req, res) => {
  if (!isConnected()) return res.json({ db: 'disconnected', counts: {} })
  const [projects, unread, skills, services] = await Promise.all([
    ProjectModel.countDocuments(),
    ContactModel.countDocuments({
      $or: [{ status: 'unread' }, { status: { $exists: false } }],
    }),
    SkillModel.countDocuments({ isPublished: true }),
    ServiceModel.countDocuments({ isPublished: true }),
  ])
  res.json({ db: 'connected', counts: { projects, unread, skills, services } })
})
