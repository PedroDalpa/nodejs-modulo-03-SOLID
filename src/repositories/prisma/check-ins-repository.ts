import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepositoryInterface } from '../interfaces/check-ins-repository'
import { prisma } from '@/lib/prisma'

export class CheckInsRepository implements CheckInsRepositoryInterface {
  async create(data: Prisma.CheckInCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data })

    return checkIn
  }
}
