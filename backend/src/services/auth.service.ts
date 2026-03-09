import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export class AuthService {
  static async register(data: any) {
    const userExists = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (userExists) {
      throw new Error('Email já cadastrado')
    }

    const passwordHash = await bcrypt.hash(data.password, 10)

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: passwordHash,
        role: 'USER' // ✅ padrão
      }
    })

    return user
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({
      where: { email: data.email }
    })

    if (!user) {
      throw new Error('Credenciais inválidas')
    }

    const passwordMatch = await bcrypt.compare(
      data.password,
      user.password
    )

    if (!passwordMatch) {
      throw new Error('Credenciais inválidas')
    }

    const token = jwt.sign(
      {
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    )

    // ✅ AGORA RETORNA TUDO QUE O FRONT PRECISA
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        role: user.role,
      },
    }
  }
}
