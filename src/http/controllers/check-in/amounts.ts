import { FastifyReply, FastifyRequest } from 'fastify'
import { MakeGetUserCheckInsAmountUseCase } from '@/useCases/factories/make-get-user-check-ins-amount-use-case'

export async function amount(req: FastifyRequest, res: FastifyReply) {
  const checkInsAmountUseCase = MakeGetUserCheckInsAmountUseCase()

  const { checkInsAmount } = await checkInsAmountUseCase.execute({
    userId: req.user.sub,
  })

  return res.status(200).send({ amount: checkInsAmount })
}
