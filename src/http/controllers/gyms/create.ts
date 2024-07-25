import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeCreateGymUseCase } from '@/useCases/factories/make-create-gym-use-case'

export async function create(req: FastifyRequest, res: FastifyReply) {
  const createGymBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
    phone: z.string(),
    title: z.string(),
    description: z.string().nullable(),
  })

  const { latitude, longitude, phone, title, description } =
    createGymBodySchema.parse(req.body)

  const createGymUseCase = MakeCreateGymUseCase()

  await createGymUseCase.execute({
    latitude,
    longitude,
    phone,
    title,
    description,
  })

  return res.status(201).send()
}
