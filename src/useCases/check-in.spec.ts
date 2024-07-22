import { describe, it, beforeEach, expect, vi, afterEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'
import { CheckInUseCase } from './check-in'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInUseCase: CheckInUseCase
let inMemoryGymsRepository: InMemoryGymsRepository

describe('Check in Use Case', () => {
  beforeEach(async () => {
    const inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    checkInUseCase = new CheckInUseCase(
      inMemoryCheckInsRepository,
      inMemoryGymsRepository,
    )

    inMemoryGymsRepository.create({
      id: 'gym-01',
      description: 'Gym 1',
      title: 'Gym 1',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
      phone: '11111',
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to make check-in', async () => {
    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to make check-in in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 6, 18, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(() =>
      checkInUseCase.execute({
        gymId: 'gym-01',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to make check-in in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 6, 18, 8, 0, 0))

    await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date(2024, 6, 19, 8, 0, 0))

    const { checkIn } = await checkInUseCase.execute({
      gymId: 'gym-01',
      userId: 'user-01',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to make check-in on distant gym', async () => {
    inMemoryGymsRepository.create({
      id: 'gym-02',
      description: 'Gym 2',
      title: 'Gym 2',
      latitude: new Decimal(300),
      longitude: new Decimal(300),
      phone: '2222',
    })

    expect(async () => {
      await checkInUseCase.execute({
        gymId: 'gym-02',
        userId: 'user-01',
        userLatitude: 0,
        userLongitude: 0,
      })
    }).rejects.toBeInstanceOf(Error)
  })
})
