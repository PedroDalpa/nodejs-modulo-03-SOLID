import { PrismaUsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterUseCase } from '../register'

export function MakeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
