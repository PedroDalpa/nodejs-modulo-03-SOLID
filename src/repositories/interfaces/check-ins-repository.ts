import { Prisma, CheckIn } from '@prisma/client'

export type FindByUserIdOnDateProps = {
  userId: string
  date: Date
}
export interface CheckInsRepositoryInterface {
  create(user: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(data: FindByUserIdOnDateProps): Promise<CheckIn | null>
}
