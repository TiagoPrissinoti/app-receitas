import { Response, NextFunction } from 'express'
import { RequestWithUser } from '../types/auth-request'

export function requireRole(role: 'USER' | 'ADMIN') {
  return (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado' })
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    next()
  }
}
