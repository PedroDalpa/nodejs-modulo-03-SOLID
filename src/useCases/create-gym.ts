import { GymsRepositoryInterface } from '@/repositories/interfaces/gym-repository'
import { Gym } from '@prisma/client'

type CreateGymUseCaseRequest = {
  title: string
  description?: string | null
  phone: string
  latitude: number
  longitude: number
}

type CreateGymResponse = {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymRepository: GymsRepositoryInterface) {}

  async execute({
    title,
    description,
    latitude,
    longitude,
    phone,
  }: CreateGymUseCaseRequest): Promise<CreateGymResponse> {
    const gym = await this.gymRepository.create({
      title,
      description,
      phone,
      latitude,
      longitude,
    })

    return { gym }
  }
}
