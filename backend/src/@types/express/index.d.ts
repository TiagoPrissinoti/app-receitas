import 'express'

declare global {
  namespace Express {
    interface Request {
      user?: {
        sub: string
        role: 'USER' | 'ADMIN'
        iat?: number
        exp?: number
      }
    }
  }
}

export {}
