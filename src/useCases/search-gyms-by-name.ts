import { GymsRepositoryInterface } from '@/repositories/interfaces/gym-repository'
import { Gym } from '@prisma/client'

type SearchGymsUseCaseRequest = {
  name: string
  page?: number | null
  pageSize?: number | null
}

type SearchGymsUseCaseResponse = {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepositoryInterface) {}

  async execute({
    name,
    page,
    pageSize,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findByName({
      name,
      page: page ?? 1,
      pageSize: pageSize ?? 20,
    })

    return { gyms }
  }
}
