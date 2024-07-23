import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { Decimal } from '@prisma/client/runtime/library'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase
describe('Fetch nearby gyms Use Case', () => {
  beforeEach(async () => {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      id: 'gym-1',
      title: 'Far gym',
      description: 'Gym 1',
      phone: '1234567890',
      latitude: new Decimal(-21.5704946),
      longitude: new Decimal(-50.6172257),
    })

    await inMemoryGymsRepository.create({
      id: 'gym-2',
      title: 'nearby',
      description: 'nearby',
      phone: '12',
      latitude: new Decimal(-21.2704946),
      longitude: new Decimal(-50.3172257),
    })

    await inMemoryGymsRepository.create({
      id: 'gym-3',
      title: 'Academia full body',
      description: 'Academia full body',
      phone: '55555',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })
  })

  it('should be able to search gyms nearby', async () => {
    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -21.2705946,
      userLongitude: -50.3173257,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'nearby' })])
  })

  it('should be able to search nearby gyms and return zero results', async () => {
    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: -21.2617546,
      userLongitude: -50.3312838,
    })

    expect(gyms).toHaveLength(0)
  })
})
