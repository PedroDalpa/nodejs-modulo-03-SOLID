import { describe, it, beforeEach, expect } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/gyms-repository'
import { CreateGymUseCase } from './create-gym'

let createGymUseCase: CreateGymUseCase

describe('Create gym Use Case', () => {
  beforeEach(async () => {
    const inMemoryGymsRepository = new InMemoryGymsRepository()
    createGymUseCase = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await createGymUseCase.execute({
      latitude: 0,
      longitude: 0,
      title: 'Gym 1',
      description: 'Gym 1 description',
      phone: '12345',
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
