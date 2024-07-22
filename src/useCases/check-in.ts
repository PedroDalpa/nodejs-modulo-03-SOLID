import { CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '@/repositories/interfaces/check-ins-repository'
import { GymsRepositoryInterface } from '@/repositories/interfaces/gym-repository'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { getDistanceBetweenCoordinates } from './utils/get-distance-between-coordinates'
import { MaxDistanceError } from './errors/max-distance'
import { MaxNumberOfCheckInsError } from './errors/max-number-of-check-ins'

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

type CheckInUseCaseResponse = {
  checkIn: CheckIn
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1
export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepositoryInterface,
    private gymsRepository: GymsRepositoryInterface,
  ) {}

  async execute({
    gymId,
    userId,
    userLatitude,
    userLongitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates({
      from: { latitude: userLatitude, longitude: userLongitude },
      to: {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    })

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate({
      userId,
      date: new Date(),
    })

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckInsError()
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
