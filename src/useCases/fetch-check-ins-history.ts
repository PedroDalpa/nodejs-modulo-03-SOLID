import { CheckInsRepositoryInterface } from '@/repositories/interfaces/check-ins-repository'
import { CheckIn } from '@prisma/client'

type FetchCheckInsHistoryUseCaseRequest = {
  userId: string
  page?: number | null
  pageSize?: number | null
}

type FetchCheckInsHistoryUseCaseResponse = {
  checkIns: CheckIn[]
}

const DEFAULT_PAGE = 1
const DEFAULT_PAGE_SIZE = 20

export class FetchCheckInsHistoryUseCase {
  constructor(private checkInRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
    page,
    pageSize,
  }: FetchCheckInsHistoryUseCaseRequest): Promise<FetchCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInRepository.findByUserId({
      userId,
      page: page ?? DEFAULT_PAGE,
      pageSize: pageSize ?? DEFAULT_PAGE_SIZE,
    })

    return { checkIns }
  }
}
