import { env } from '@/env'
import { UserRepositoryInterface } from '@/repositories/interfaces/users-repository-interface'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists'

type RegisterUseCaseRequest = {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepositoryInterface) {}

  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const passwordHash = await hash(password, env.HASH_SALT)

    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      throw new UserAlreadyExistsError()
    }

    this.userRepository.create({
      email,
      name,
      password_hash: passwordHash,
    })
  }
}
