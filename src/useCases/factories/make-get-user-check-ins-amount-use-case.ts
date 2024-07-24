import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { GetUserCheckInsAmountUseCase } from '../get-user-check-ins-amount'

export function MakeGetUserCheckInsAmountUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const makeGetUserCheckInsAmountUseCase = new GetUserCheckInsAmountUseCase(
    checkInsRepository,
  )

  return makeGetUserCheckInsAmountUseCase
}
