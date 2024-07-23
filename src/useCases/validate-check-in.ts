import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '@/repositories/interfaces/check-ins-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import dayjs from 'dayjs'
import { LateCheckInValidate } from './errors/late-check-in-validation'

type ValidateCheckInUseCaseRequest = {
  checkInId: string
}

type ValidateCheckInUseCaseResponse = {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepositoryInterface) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    const distanceInMinuteFromCheckInCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinuteFromCheckInCreation > 20) {
      throw new LateCheckInValidate()
    }

    checkIn.validated_at = new Date()

    await this.checkInsRepository.update(checkIn)

    return {
      checkIn,
    }
  }
}
