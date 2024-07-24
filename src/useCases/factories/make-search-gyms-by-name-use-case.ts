import { SearchGymsUseCase } from '../search-gyms-by-name'
import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'

export function MakeSearchGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const makeSearchGymsUseCase = new SearchGymsUseCase(gymsRepository)

  return makeSearchGymsUseCase
}
