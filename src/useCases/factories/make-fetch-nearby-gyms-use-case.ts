import { PrismaGymsRepository } from '@/repositories/prisma/gyms-repository'
import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export function MakeFetchNearbyGymsUseCase() {
  const gymsRepository = new PrismaGymsRepository()
  const makeFetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)

  return makeFetchNearbyGymsUseCase
}
