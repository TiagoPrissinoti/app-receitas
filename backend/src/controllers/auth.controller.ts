import { Request, Response } from 'express'
import { AuthService } from '../services/auth.service'
import { registerSchema, loginSchema } from '../schemas/auth.schema'

export class AuthController {
  static async register(req: Request, res: Response) {
    const data = registerSchema.parse(req.body)

    const user = await AuthService.register(data)

    return res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email
    })
  }

 static async login(req: Request, res: Response) {
  const data = loginSchema.parse(req.body)

  const { token, user } = await AuthService.login(data)

  return res.json({
    token,
    user
  })
}


}
