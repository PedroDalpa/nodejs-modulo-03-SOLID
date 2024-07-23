import { describe, it, beforeEach, expect } from 'vitest'
import { FetchCheckInsHistoryUseCase } from './fetch-check-ins-history'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/check-ins-repository'

let fetchCheckInsHistoryUseCase: FetchCheckInsHistoryUseCase
let inMemoryCheckInsRepository: InMemoryCheckInsRepository

describe('Fetch check-ins Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    fetchCheckInsHistoryUseCase = new FetchCheckInsHistoryUseCase(
      inMemoryCheckInsRepository,
    )

    inMemoryCheckInsRepository.create({
      gym_id: 'gym_id',
      user_id: '1',
    })
  })

  it('should be able to fetch check-in history', async () => {
    const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
      userId: '1',
    })

    expect(checkIns).length(1)
  })

  it('should be able to fetch empty check-in history', async () => {
    const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
      userId: '2',
    })

    expect(checkIns).length(0)
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let index = 0; index < 22; index++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym_id_${index}`,
        user_id: '3',
      })
    }
    const { checkIns } = await fetchCheckInsHistoryUseCase.execute({
      userId: '3',
      page: 2,
    })

    expect(checkIns).length(2)
  })
})
