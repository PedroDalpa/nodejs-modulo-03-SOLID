import { GymsRepositoryInterface } from '@/repositories/interfaces/gym-repository'
import { Gym } from '@prisma/client'

type FetchNearbyGymsUseCaseRequest = {
  userLatitude: number
  userLongitude: number
}

type FetchNearbyGymsUseCaseResponse = {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findByNearby({
      userLatitude,
      userLongitude,
    })

    return { gyms }
  }
}
