import { Prisma, CheckIn } from '@prisma/client'

export type FindCheckInsByUserIdOnDateProps = {
  userId: string
  date: Date
}

export type FindCheckInsByUserIdProps = {
  userId: string
  page: number
  pageSize: number
}
export interface CheckInsRepositoryInterface {
  create(user: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(
    data: FindCheckInsByUserIdOnDateProps,
  ): Promise<CheckIn | null>
  findByUserId({
    userId,
    page,
    pageSize,
  }: FindCheckInsByUserIdProps): Promise<CheckIn[]>
  getAmountByUserId(userId: string): Promise<number>
  findById(checkInId: string): Promise<CheckIn | null>
  update(checkIn: CheckIn): Promise<CheckIn>
}
