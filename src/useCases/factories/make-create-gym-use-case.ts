import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function MakeCreateGymUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const makeCreateGymUseCase = new CreateGymUseCase(gymsRepository)

  return makeCreateGymUseCase
}
