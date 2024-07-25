import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeSearchGymsUseCase } from '@/useCases/factories/make-search-gyms-by-name-use-case'

export async function search(req: FastifyRequest, res: FastifyReply) {
  const searchGymQuerySchema = z.object({
    name: z.string(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(20),
  })

  const { name, page, pageSize } = searchGymQuerySchema.parse(req.query)

  const searchGymUseCase = MakeSearchGymsUseCase()

  const gyms = await searchGymUseCase.execute({
    name,
    page,
    pageSize,
  })

  return res.status(201).send({ gyms })
}
