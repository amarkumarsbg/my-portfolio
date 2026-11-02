import mongoose, { Schema } from 'mongoose'

const itemOptions = { timestamps: true }
const publishedOrder = {
  isPublished: { type: Boolean, default: true, index: true },
  order: { type: Number, default: 0, index: true },
}

const siteSettingsSchema = new Schema(
  {
    key: { type: String, default: 'site', unique: true },
    name: { type: String, default: 'Amar' },
    title: { type: String, default: 'Full Stack Developer' },
    bio: { type: String, default: '' },
    email: { type: String, default: '' },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    avatarUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '/resume.pdf' },
    seoTitle: { type: String, default: '' },
    seoDescription: { type: String, default: '' },
    chatbotSystemPrompt: { type: String, default: '' },
    chatbotWelcomeMessage: { type: String, default: '' },
  },
  itemOptions
)

const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, default: 'Frontend' },
    iconUrl: String,
    ...publishedOrder,
  },
  itemOptions
)
const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    iconSvg: String,
    ...publishedOrder,
  },
  itemOptions
)
const experienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: String,
    period: String,
    description: String,
    tech: [String],
    ...publishedOrder,
  },
  itemOptions
)
const certificationSchema = new Schema(
  {
    title: { type: String, required: true },
    issuer: String,
    year: String,
    iconUrl: String,
    credentialUrl: String,
    ...publishedOrder,
  },
  itemOptions
)
const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: String,
    text: String,
    avatar: String,
    ...publishedOrder,
  },
  itemOptions
)
const blogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: String,
    content: String,
    date: { type: String, default: '' },
    readTime: String,
    tag: String,
    coverImageUrl: String,
    ...publishedOrder,
  },
  itemOptions
)

function model(
  name: string,
  schema: Schema
): mongoose.Model<Record<string, unknown>> {
  return (
    (mongoose.models[name] as
      | mongoose.Model<Record<string, unknown>>
      | undefined) ?? mongoose.model<Record<string, unknown>>(name, schema)
  )
}

export const SiteSettingsModel = model('SiteSettings', siteSettingsSchema)
export const SkillModel = model('Skill', skillSchema)
export const ServiceModel = model('Service', serviceSchema)
export const ExperienceModel = model('Experience', experienceSchema)
export const CertificationModel = model('Certification', certificationSchema)
export const TestimonialModel = model('Testimonial', testimonialSchema)
export const BlogPostModel = model('BlogPost', blogPostSchema)
