import { InvalidCredentialError } from '@/useCases/errors/invalid-credentials'
import { MakeAuthenticateUseCase } from '@/useCases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const { email, password } = authenticateBodySchema.parse(req.body)

  try {
    const authenticateUseCase = MakeAuthenticateUseCase()

    await authenticateUseCase.execute({ email, password })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return res.status(400).send({ message: error.message })
    }

    throw error
  }

  return res.status(200).send()
}
