import { Gym, Prisma } from '@prisma/client'

export type FindGymsByNameProps = {
  name: string
  page: number
  pageSize: number
}

export type FindGymsNearbyProps = {
  userLatitude: number
  userLongitude: number
}

export interface GymsRepositoryInterface {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  findByName(data: FindGymsByNameProps): Promise<Gym[]>
  findByNearby(data: FindGymsNearbyProps): Promise<Gym[]>
}
