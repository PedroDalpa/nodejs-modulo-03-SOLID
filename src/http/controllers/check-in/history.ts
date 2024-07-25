import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeFetchCheckInsHistoryUseCase } from '@/useCases/factories/make-fetch-check-ins-history-use-case'

export async function history(req: FastifyRequest, res: FastifyReply) {
  const historyCheckInsQuerySchema = z.object({
    name: z.string(),
    page: z.coerce.number().min(1).default(1),
    pageSize: z.coerce.number().min(1).default(20),
  })

  const { page, pageSize } = historyCheckInsQuerySchema.parse(req.query)

  const historyCheckInsUseCase = MakeFetchCheckInsHistoryUseCase()

  const { checkIns } = await historyCheckInsUseCase.execute({
    userId: req.user.sub,
    page,
    pageSize,
  })

  return res.status(200).send({ checkIns })
}
