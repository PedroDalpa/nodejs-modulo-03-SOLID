import { PrismaCheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { FetchCheckInsHistoryUseCase } from '../fetch-check-ins-history'

export function MakeFetchCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const makeFetchCheckInsHistoryUseCase = new FetchCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return makeFetchCheckInsHistoryUseCase
}
