import { Gym } from '@prisma/client'
import { GymsRepositoryInterface } from '../interfaces/gym-repository'

export class InMemoryGymsRepository implements GymsRepositoryInterface {
  public gyms: Gym[] = []
  async findById(id: string): Promise<Gym | null> {
    return this.gyms.find((gym) => gym.id === id) ?? null
  }
}
