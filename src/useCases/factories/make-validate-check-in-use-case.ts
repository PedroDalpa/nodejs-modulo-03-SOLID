import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { ValidateCheckInUseCase } from '../validate-check-in'

export function MakeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const makeValidateCheckInUseCase = new ValidateCheckInUseCase(
    checkInsRepository,
  )

  return makeValidateCheckInUseCase
}
