import 'express-serve-static-core'

declare module 'express-serve-static-core' {
  interface Request {
    user?: {
      sub: string
      role: 'USER' | 'ADMIN'
      iat?: number
      exp?: number
    }
  }
}

export {}
