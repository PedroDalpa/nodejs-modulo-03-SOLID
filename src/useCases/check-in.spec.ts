import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'

let checkInUseCase: CheckInUseCase

describe('Check in Use Case', () => {
  beforeEach(async () => {
    const inMemoryRepository = new InMemoryCheckInsRepository()
    checkInUseCase = new CheckInUseCase(inMemoryRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to make check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to make check-in in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 6, 18, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to make check-in in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 6, 18, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    vi.setSystemTime(new Date(2024, 6, 19, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
