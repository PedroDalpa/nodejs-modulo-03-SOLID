import { CheckInsRepositoryInterface } from '@/repositories/interfaces/check-ins-repository'

type GetUserCheckInsAmountUseCaseRequest = {
  userId: string
}

type GetUserCheckInsAmountUseCaseResponse = {
  checkInsAmount: number
}

export class GetUserCheckInsAmountUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    userId,
  }: GetUserCheckInsAmountUseCaseRequest): Promise<GetUserCheckInsAmountUseCaseResponse> {
    const checkInsAmount =
      await this.checkInsRepository.getAmountByUserId(userId)

    return { checkInsAmount }
  }
}
