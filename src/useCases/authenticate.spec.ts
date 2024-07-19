import { describe, it, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/users-repository'
import { hash } from 'bcryptjs'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialError } from './errors/invalid-credentials'
import { env } from '@/env'

let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    const inMemoryRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      email: 'jonh.doe@example.com',
      password_hash: await hash('password123', env.HASH_SALT),
      name: 'Jonh Doe',
    })
  })

  it('should be able authenticate', async () => {
    const { user } = await authenticateUseCase.execute({
      email: 'jonh.doe@example.com',
      password: 'password123',
    })

    expect(user.email).toEqual('jonh.doe@example.com')
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able authenticate with wrong email', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'wrong@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('should not be able authenticate with wrong password', async () => {
    await expect(() =>
      authenticateUseCase.execute({
        email: 'jonh.doe@example.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})
