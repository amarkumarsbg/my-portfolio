import { Router } from 'express'
import multer from 'multer'
import { v2 as cloudinary } from 'cloudinary'
import { requireAdminAuth } from '../middleware/requireAdminAuth.js'

export const adminMediaRouter = Router()
adminMediaRouter.use(requireAdminAuth)

const acceptedTypes = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'application/pdf',
])
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, callback) => {
    if (!acceptedTypes.has(file.mimetype)) {
      callback(
        new Error('Only JPEG, PNG, WebP, SVG, and PDF files are allowed')
      )
      return
    }
    callback(null, true)
  },
})

adminMediaRouter.post(
  '/upload',
  (req, res, next) => {
    upload.single('file')(req, res, (error) => {
      if (error) {
        res.status(400).json({
          error: error instanceof Error ? error.message : 'Upload rejected',
        })
        return
      }
      next()
    })
  },
  async (req, res) => {
    if (!process.env.CLOUDINARY_URL)
      return res.status(503).json({ error: 'Media storage is not configured' })
    if (!req.file)
      return res.status(400).json({ error: 'Choose a file to upload' })
    try {
      const result = await new Promise<{
        secure_url: string
        public_id: string
        resource_type: string
      }>((resolve, reject) => {
        const resourceType =
          req.file?.mimetype === 'application/pdf' ? 'raw' : 'image'
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'portfolio-cms', resource_type: resourceType },
          (error, uploaded) =>
            error || !uploaded
              ? reject(error ?? new Error('Upload failed'))
              : resolve(uploaded)
        )
        stream.end(req.file?.buffer)
      })
      res.status(201).json({
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
      })
    } catch (error) {
      res.status(502).json({
        error: error instanceof Error ? error.message : 'Upload failed',
      })
    }
  }
)

adminMediaRouter.delete('/', async (req, res) => {
  if (!process.env.CLOUDINARY_URL)
    return res.status(503).json({ error: 'Media storage is not configured' })
  const { publicId, resourceType } = req.body ?? {}
  if (
    typeof publicId !== 'string' ||
    !publicId.startsWith('portfolio-cms/') ||
    !['image', 'raw'].includes(resourceType)
  ) {
    return res.status(400).json({ error: 'Invalid media reference' })
  }
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType })
    res.status(204).end()
  } catch {
    res.status(502).json({ error: 'Could not delete media' })
  }
})
