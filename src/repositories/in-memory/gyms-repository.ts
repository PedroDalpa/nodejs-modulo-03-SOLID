import { Gym, Prisma } from '@prisma/client'
import {
  FindGymsByNameProps,
  GymsRepositoryInterface,
} from '../interfaces/gym-repository'
import { randomUUID } from 'crypto'
import { Decimal } from '@prisma/client/runtime/library'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  private gyms: Gym[] = []
  async findById(id: string): Promise<Gym | null> {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym: Gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Decimal(data.latitude.toString()),
      longitude: new Decimal(data.longitude.toString()),
    }

    this.gyms.push(gym)

    return gym
  }

  async findByName({
    name,
    page,
    pageSize,
  }: FindGymsByNameProps): Promise<Gym[]> {
    return this.gyms
      .filter((gym) => gym.title.toLowerCase().includes(name.toLowerCase()))
      .slice((page - 1) * 20, page * pageSize)
  }
}
