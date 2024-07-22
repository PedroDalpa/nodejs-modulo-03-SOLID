import { Prisma, CheckIn } from '@prisma/client'
import {
  CheckInsRepositoryInterface,
  FindByUserIdOnDateProps,
} from '../interfaces/check-ins-repository'

export class CheckInsRepository implements CheckInsRepositoryInterface {
  create(user: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }

  findByUserIdOnDate(data: FindByUserIdOnDateProps): Promise<CheckIn> {
    throw new Error('Method not implemented.')
  }
}
