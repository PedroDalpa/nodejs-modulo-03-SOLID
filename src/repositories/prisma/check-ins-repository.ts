import { Prisma, CheckIn } from '@prisma/client'
import {
  CheckInsRepositoryInterface,
  FindCheckInsByUserIdOnDateProps,
  FindCheckInsByUserIdProps,
} from '../interfaces/check-ins-repository'
import { prisma } from '@/lib/prisma'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepositoryInterface {
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = await prisma.checkIn.create({ data })

    return checkIn
  }

  async findByUserIdOnDate(
    data: FindCheckInsByUserIdOnDateProps,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(data.date).startOf('date')
    const endOfTheDay = dayjs(data.date).endOf('date')

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: data.userId,
        created_at: { gte: startOfTheDay.toDate(), lte: endOfTheDay.toDate() },
      },
    })

    return checkIn
  }

  async findByUserId({
    userId,
    page,
    pageSize,
  }: FindCheckInsByUserIdProps): Promise<CheckIn[]> {
    const checkIns = await prisma.checkIn.findMany({
      where: { user_id: userId },
      skip: (page - 1) * pageSize,
      take: pageSize,
    })

    return checkIns
  }

  async getAmountByUserId(userId: string): Promise<number> {
    const amount = await prisma.checkIn.count({ where: { user_id: userId } })

    return amount
  }

  async findById(checkInId: string): Promise<CheckIn | null> {
    const checkIn = await prisma.checkIn.findUnique({
      where: { id: checkInId },
    })

    return checkIn
  }

  async update(checkIn: CheckIn): Promise<CheckIn> {
    const updatedCheckIn = await prisma.checkIn.update({
      where: { id: checkIn.id },
      data: checkIn,
    })

    return updatedCheckIn
  }
}
