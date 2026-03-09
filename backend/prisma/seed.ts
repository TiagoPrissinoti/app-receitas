import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const adminEmail = 'admin@admin.com'

  const adminExists = await prisma.user.findUnique({
    where: { email: adminEmail },
  })

  if (adminExists) {
    console.log('⚠️ Admin já existe')
    return
  }

  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: adminEmail,
      password: '$2b$10$.iSg.qVuqGhAHTk1Tg2mJ.VU3rcMj4prAF7SbHiRnAzY5oOz/U0bK', // 👈 cole o hash aqui
      role: 'ADMIN',
    },
  })

  console.log('✅ Usuário ADMIN criado com sucesso')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
