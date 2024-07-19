import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { hash } from 'bcryptjs'
import { env } from '@/env'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found'

let getUserProfileUseCase: GetUserProfileUseCase
let userId: string

describe('Get User Profile Use Case', () => {
  beforeEach(async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    getUserProfileUseCase = new GetUserProfileUseCase(inMemoryRepository)

    const { id } = await inMemoryRepository.create({
      email: 'jonh.doe@example.com',
      password_hash: await hash('password123', env.HASH_SALT),
      name: 'Jonh Doe',
    })

    userId = id
  })

  it('should be able to get user profile', async () => {
    const { user } = await getUserProfileUseCase.execute({
      userId,
    })

    expect(user.email).toEqual('jonh.doe@example.com')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      getUserProfileUseCase.execute({
        userId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
