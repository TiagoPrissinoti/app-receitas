import { Request, Response, NextFunction } from 'express'

export function requireRole(role: 'USER' | 'ADMIN') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Não autenticado' })
    }

    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Acesso negado' })
    }

    next()
  }
}
