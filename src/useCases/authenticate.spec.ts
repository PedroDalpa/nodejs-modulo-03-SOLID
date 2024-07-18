import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials'
import { env } from '@/env'

describe('Authenticate Use Case', () => {
  it('should be able authenticate', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      email: 'example@example.com',
      password_hash: await hash('password123', env.HASH_SALT),
      name: 'foo',
    })

    const { user } = await authenticateUseCase.execute({
      email: 'example@example.com',
      password: 'password123',
    })

    expect(user.email).toEqual('example@example.com')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able authenticate with wrong email', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      email: 'example@example.com',
      password_hash: await hash('password123', env.HASH_SALT),
      name: 'foo',
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'jonh.doe@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able authenticate with wrong password', async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      email: 'jonh.doe@example.com',
      password_hash: await hash('password123', env.HASH_SALT),
      name: 'foo',
    })

    await expect(() =>
      authenticateUseCase.execute({
        email: 'jonh.doe@example.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
