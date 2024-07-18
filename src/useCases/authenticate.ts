import { UserRepositoryInterface } from '@/repositories/interfaces/users-repository-interface'
import { compare } from 'bcryptjs'
import { InvalidCredentialError } from './errors/invalid-credentials'
import { User } from '@prisma/client'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UserRepositoryInterface) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, user?.password_hash)

    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return {
      user,
    }
  }
}
