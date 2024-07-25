import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFetchNearbyGymsUseCase } from '@/useCases/factories/make-fetch-nearby-gyms-use-case'

export async function nearby(req: FastifyRequest, res: FastifyReply) {
  const nearbyGymQuerySchema = z.object({
    userLatitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    userLongitude: z.coerce.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { userLatitude, userLongitude } = nearbyGymQuerySchema.parse(req.query)

  const nearbyGymUseCase = MakeFetchNearbyGymsUseCase()

  const { gyms } = await nearbyGymUseCase.execute({
    userLatitude,
    userLongitude,
  })

  return res.status(200).send({ gyms })
}
