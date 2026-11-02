import 'dotenv/config'
import mongoose from 'mongoose'
import { fallbackCmsContent } from '../data/cmsFallback.js'
import {
  BlogPostModel,
  CertificationModel,
  ExperienceModel,
  ServiceModel,
  SiteSettingsModel,
  SkillModel,
  TestimonialModel,
} from '../models/CmsContent.js'
import { ProjectModel } from '../models/Project.js'

type SeedModel = {
  countDocuments(): Promise<number>
  insertMany(records: Record<string, unknown>[]): Promise<unknown>
}

function withoutFallbackId(items: readonly Record<string, unknown>[]) {
  return items.map((item) =>
    Object.fromEntries(Object.entries(item).filter(([key]) => key !== '_id'))
  )
}

async function seedIfEmpty(
  name: string,
  model: SeedModel,
  records: readonly Record<string, unknown>[]
) {
  if (await model.countDocuments()) return
  await model.insertMany(withoutFallbackId(records))
  console.info(`Seeded ${records.length} records in ${name}`)
}

async function seedCms() {
  const uri = process.env.MONGODB_URI
  if (!uri) throw new Error('MONGODB_URI is required')
  await mongoose.connect(uri)

  if (!(await SiteSettingsModel.exists({ key: 'site' }))) {
    await SiteSettingsModel.create({
      ...fallbackCmsContent.settings,
      key: 'site',
    })
    console.info('Seeded site settings')
  }

  await seedIfEmpty(
    'projects',
    ProjectModel as unknown as SeedModel,
    fallbackCmsContent.projects
  )
  await seedIfEmpty(
    'skills',
    SkillModel as SeedModel,
    fallbackCmsContent.skills
  )
  await seedIfEmpty(
    'services',
    ServiceModel as SeedModel,
    fallbackCmsContent.services
  )
  await seedIfEmpty(
    'experience',
    ExperienceModel as SeedModel,
    fallbackCmsContent.experience
  )
  await seedIfEmpty(
    'certifications',
    CertificationModel as SeedModel,
    fallbackCmsContent.certifications
  )
  await seedIfEmpty(
    'testimonials',
    TestimonialModel as SeedModel,
    fallbackCmsContent.testimonials
  )
  await seedIfEmpty('blog', BlogPostModel as SeedModel, fallbackCmsContent.blog)

  await mongoose.disconnect()
}

seedCms().catch(async (error: unknown) => {
  console.error(
    'CMS seed failed:',
    error instanceof Error ? error.message : error
  )
  await mongoose.disconnect()
  process.exitCode = 1
})
