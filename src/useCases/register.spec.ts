import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-user-repository'
import { compare } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    const inMemoryRepository = new InMemoryUsersRepository()
    registerUseCase = new RegisterUseCase(inMemoryRepository)
  })

  it('should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      email: 'example@example.com',
      name: 'John Doe',
      password: 'password123',
    })

    const isPasswordCorrectlyHashed = await compare(
      'password123',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBeTruthy()
  })

  it('should not to be able to register with same email twice', async () => {
    const email = 'example@example.com'

    await registerUseCase.execute({
      email,
      name: 'John Doe',
      password: 'password123',
    })

    await expect(() =>
      registerUseCase.execute({
        email,
        name: 'John Doe',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      email: 'example@example.com',
      name: 'John Doe',
      password: 'password123',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})
