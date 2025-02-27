import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { MakeValidateCheckInUseCase } from '@/useCases/factories/make-validate-check-in-use-case'

export async function validate(req: FastifyRequest, res: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(req.params)

  const validateCheckInUseCase = MakeValidateCheckInUseCase()

  await validateCheckInUseCase.execute({
    checkInId,
  })

  return res.status(204).send()
}
