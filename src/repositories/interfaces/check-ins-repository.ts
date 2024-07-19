import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepositoryInterface {
  create(user: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
