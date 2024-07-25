import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeCheckInUseCase } from '@/useCases/factories/make-check-in-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string(),
  })

  const createCheckInBodySchema = z.object({
    userLatitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = createCheckInBodySchema.parse(
    req.body,
  )

  const { gymId } = createCheckInParamsSchema.parse(req.params)

  const createCheckInUseCase = MakeCheckInUseCase()

  await createCheckInUseCase.execute({
    gymId,
    userId: req.user.sub,
    userLatitude,
    userLongitude,
  })

  return res.status(201).send()
}
