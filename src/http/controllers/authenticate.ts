import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { AuthenticateUseCase } from '@/useCases/authenticate'
import { InvalidCredentialError } from '@/useCases/errors/invalid-credentials'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const usersRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }

  return res.status(200).send()
}
