import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '@/repositories/interfaces/check-ins-repository'

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    gymId,
    userId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate({
      userId,
      date: new Date(),
    })

    if (checkInOnSameDate) {
      throw new Error('Error')
    }

    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
