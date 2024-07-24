import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { CheckInUseCase } from '../check-in'

export function MakeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const makeCheckInUseCase = new CheckInUseCase(
    checkInsRepository,
    gymsRepository,
  )

  return makeCheckInUseCase
}
