import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInUseCase: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(async () => {
    const inMemoryRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(inMemoryRepository)
  })

  it('should be able to make check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
