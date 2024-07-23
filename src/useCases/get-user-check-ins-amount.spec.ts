import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserCheckInsAmountUseCase } from './get-user-check-ins-amount'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'

let getUserCheckInsAmountUseCase: GetUserCheckInsAmountUseCase

describe('Get user check-ins amount', () => {
  beforeEach(async () => {
    const inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    getUserCheckInsAmountUseCase = new GetUserCheckInsAmountUseCase(
      inMemoryCheckInsRepository,
    )

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_id',
      user_id: '1',
    })
  })

  it('should be able to get user check-ins amount', async () => {
    const { checkInsAmount } = await getUserCheckInsAmountUseCase.execute({
      userId: '1',
    })

    expect(checkInsAmount).toEqual(1)
  })

  it('should be able to get user check-ins amount when is zero', async () => {
    const { checkInsAmount } = await getUserCheckInsAmountUseCase.execute({
      userId: '2',
    })

    expect(checkInsAmount).toEqual(0)
  })
})
