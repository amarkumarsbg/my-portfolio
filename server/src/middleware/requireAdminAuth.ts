import type { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const ADMIN_COOKIE = 'portfolio_admin_session'

export interface AdminRequest extends Request {
  adminEmail?: string
}

export function requireAdminAuth(
  req: AdminRequest,
  res: Response,
  next: NextFunction
): void {
  const secret = process.env.JWT_SECRET
  const token = req.signedCookies?.[ADMIN_COOKIE] as string | undefined
  if (!secret || !token) {
    res.status(401).json({ error: 'Authentication required' })
    return
  }
  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload
    if (
      typeof payload.email !== 'string' ||
      payload.email !== process.env.ADMIN_EMAIL
    ) {
      res.status(401).json({ error: 'Authentication required' })
      return
    }
    req.adminEmail = payload.email
    next()
  } catch {
    res.status(401).json({ error: 'Authentication required' })
  }
}
