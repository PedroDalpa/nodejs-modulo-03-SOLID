import { env } from '@/env'
import { UserRepositoryInterface } from '@/repositories/interfaces/users-repository-interface'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'
import { User } from '@prisma/client'

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

type RegisterUseCaseResponse = {
  user: User
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const passwordHash = await hash(password, env.HASH_SALT)

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })

    return { user }
  }
}
