import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { ValidateCheckInUseCase } from './validate-check-in'
import { ResourceNotFoundError } from './errors/resource-not-found'
import { LateCheckInValidate } from './errors/late-check-in-validation'

let validateCheckInUseCase: ValidateCheckInUseCase
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

describe('Check in Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    validateCheckInUseCase = new ValidateCheckInUseCase(
      inMemoryCheckInsRepository,
    )

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_id',
      user_id: '1',
      id: 'check-in-id-1',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to validate check-in', async () => {
    const { checkIn } = await validateCheckInUseCase.execute({
      checkInId: 'check-in-id-1',
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate check-in that does not exist', async () => {
    await expect(
      validateCheckInUseCase.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 6, 18, 8, 20))

    await inMemoryCheckInsRepository.create({
      gym_id: 'gym_id',
      user_id: '1',
      id: 'check-in-id-4',
    })

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS) // 20 minutes

    await expect(
      validateCheckInUseCase.execute({
        checkInId: 'check-in-id-4',
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidate)
  })
})
