import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import supertest from 'supertest'

type CreateAndAuthenticateUserProps = {
  email?: string
  isAdmin?: boolean
}

export async function createAndAuthenticateUser({
  email = 'john.doe@example.com',
  isAdmin = false,
}: CreateAndAuthenticateUserProps) {
  await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      password_hash: await hash('password123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBERS',
    },
  })

  const { body } = await supertest(app.server).post('/auth').send({
    email,
    password: 'password123',
  })

  const token: string = body?.token

  return { token }
}
