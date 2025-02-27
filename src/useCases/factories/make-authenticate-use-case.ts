import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { AuthenticateUseCase } from '../authenticate'

export function MakeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
