import { Gym, Prisma } from '@prisma/client'
import {
  FindGymsByNameProps,
  FindGymsNearbyProps,
  GymsRepositoryInterface,
} from '../interfaces/gym-repository'
import { prisma } from '@/lib/prisma'

export class PrismaGymsRepository implements GymsRepositoryInterface {
  async findById(id: string): Promise<Gym | null> {
    return await prisma.gym.findUnique({ where: { id } })
  }

  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    return await prisma.gym.create({ data })
  }

  async findByName({
    name,
    page,
    pageSize,
  }: FindGymsByNameProps): Promise<Gym[]> {
    return await prisma.gym.findMany({
      where: { title: { contains: name } },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })
  }

  async findByNearby({
    userLatitude,
    userLongitude,
  }: FindGymsNearbyProps): Promise<Gym[]> {
    const gyms: Gym[] = await prisma.$queryRaw`
      SELECT * FROM gyms 
      WHERE ( 6371 * acos( cos( radians(${userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${userLongitude}) ) + sin( radians(${userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
