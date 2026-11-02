import { Router } from 'express'
import rateLimit from 'express-rate-limit'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { timingSafeEqual } from 'node:crypto'
import {
  ADMIN_COOKIE,
  requireAdminAuth,
  type AdminRequest,
} from '../middleware/requireAdminAuth.js'

export const adminAuthRouter = Router()

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  skipSuccessfulRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Try again in 15 minutes.' },
})

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    signed: true,
    path: '/api/admin',
    maxAge: 8 * 60 * 60 * 1000,
  }
}

adminAuthRouter.post('/login', loginLimiter, async (req, res) => {
  const { email, password } = req.body ?? {}
  const adminEmail = process.env.ADMIN_EMAIL
  const passwordHash = process.env.ADMIN_PASSWORD_HASH
  const plainPassword = process.env.ADMIN_PASSWORD
  const jwtSecret = process.env.JWT_SECRET
  const isProduction = process.env.NODE_ENV === 'production'

  const missingSecrets =
    !adminEmail ||
    (!passwordHash && !plainPassword) ||
    !jwtSecret ||
    !process.env.COOKIE_SECRET
  const insecureProductionConfig =
    isProduction &&
    (Boolean(plainPassword) ||
      (jwtSecret ?? '').length < 32 ||
      (process.env.COOKIE_SECRET ?? '').length < 32 ||
      jwtSecret?.startsWith('replace_with_') ||
      process.env.COOKIE_SECRET?.startsWith('replace_with_'))
  if (missingSecrets || insecureProductionConfig) {
    res.status(503).json({ error: 'Admin authentication is not configured' })
    return
  }
  if (typeof email !== 'string' || typeof password !== 'string') {
    res.status(400).json({ error: 'Email and password are required' })
    return
  }

  const emailMatches =
    email.trim().toLowerCase() === adminEmail.trim().toLowerCase()
  const passwordMatches = plainPassword
    ? safePasswordMatch(password, plainPassword)
    : passwordHash
      ? await bcrypt.compare(password, passwordHash).catch(() => false)
      : false
  if (!emailMatches || !passwordMatches) {
    res.status(401).json({ error: 'Invalid email or password' })
    return
  }

  const token = jwt.sign({ email: adminEmail }, jwtSecret, { expiresIn: '8h' })
  res.cookie(ADMIN_COOKIE, token, cookieOptions()).json({ email: adminEmail })
})

function safePasswordMatch(input: string, expected: string): boolean {
  const inputBuffer = Buffer.from(input)
  const expectedBuffer = Buffer.from(expected)
  return (
    inputBuffer.length === expectedBuffer.length &&
    timingSafeEqual(inputBuffer, expectedBuffer)
  )
}

adminAuthRouter.post('/logout', (_req, res) => {
  res.clearCookie(ADMIN_COOKIE, { ...cookieOptions(), maxAge: undefined })
  res.status(204).end()
})

adminAuthRouter.get('/me', requireAdminAuth, (req: AdminRequest, res) => {
  res.json({ email: req.adminEmail })
})
