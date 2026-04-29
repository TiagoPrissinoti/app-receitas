import { Request } from 'express'

export type AuthUser = {
  sub: string
  role: 'USER' | 'ADMIN'
  iat?: number
  exp?: number
}

export type RequestWithUser = Request & {
  user?: AuthUser
}
