import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'

export const app = fastify()

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    id: crypto.randomUUID(),
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
})
