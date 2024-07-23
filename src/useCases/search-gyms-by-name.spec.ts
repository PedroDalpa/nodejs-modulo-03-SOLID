import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymsUseCase } from './search-gyms-by-name'
import { Decimal } from '@prisma/client/runtime/library'

let searchGymsUseCase: SearchGymsUseCase
describe('Search gyms by name Use Case', () => {
  beforeEach(async () => {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    searchGymsUseCase = new SearchGymsUseCase(inMemoryGymsRepository)

    await inMemoryGymsRepository.create({
      id: 'gym-1',
      title: 'Gym 1',
      description: 'Gym 1',
      phone: '1234567890',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

    await inMemoryGymsRepository.create({
      id: 'gym-2',
      title: 'treinamento comporal gym',
      description: 'Gym 2',
      phone: '12',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
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

  it('should be able to search gyms by name', async () => {
    const { gyms } = await searchGymsUseCase.execute({ name: 'gym' })

    expect(gyms).toHaveLength(2)
  })

  it('should be able to search gyms by name and return zero results', async () => {
    const { gyms } = await searchGymsUseCase.execute({ name: 'treino' })

    expect(gyms).toHaveLength(0)
  })
})
