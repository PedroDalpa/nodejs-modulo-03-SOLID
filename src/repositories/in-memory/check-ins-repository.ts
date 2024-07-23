import { CheckIn, Prisma } from '@prisma/client'
import {
  CheckInsRepositoryInterface,
  FindCheckInsByUserIdOnDateProps,
  FindCheckInsByUserIdProps,
} from '../interfaces/check-ins-repository'
import { randomUUID } from 'crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepositoryInterface {
  private checkIns: CheckIn[] = []
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate({
    date,
    userId,
  }: FindCheckInsByUserIdOnDateProps): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkIsOnSameDate = this.checkIns.find(
      (checkIn) =>
        checkIn.user_id === userId &&
        dayjs(checkIn.created_at).isAfter(startOfTheDay) &&
        dayjs(checkIn.created_at).isBefore(endOfTheDay),
    )

    return checkIsOnSameDate ?? null
  }

  async findByUserId({
    userId,
    page,
    pageSize,
  }: FindCheckInsByUserIdProps): Promise<CheckIn[]> {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * pageSize)
  }

  async getAmountByUserId(userId: string): Promise<number> {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length
  }
}
