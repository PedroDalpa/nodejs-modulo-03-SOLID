import { Prisma, CheckIn } from '@prisma/client'

export type FindByUserIdOnDateProps = {
  userId: string
  date: Date
}

export type FindByUserIdProps = {
  userId: string
  page: number
  pageSize: number
}
export interface CheckInsRepositoryInterface {
  create(user: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(data: FindByUserIdOnDateProps): Promise<CheckIn | null>
  findByUserId({
    userId,
    page,
    pageSize,
  }: FindByUserIdProps): Promise<CheckIn[]>
  getAmountByUserId(userId: string): Promise<number>
}
