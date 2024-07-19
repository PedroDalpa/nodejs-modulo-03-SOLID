import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UserRepositoryInterface } from '../interfaces/users-repository-interface'

export class PrismaUsersRepository implements UserRepositoryInterface {
  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { email } })
  }

  async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({ where: { id } })
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
