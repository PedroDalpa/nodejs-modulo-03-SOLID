import { User, Prisma } from '@prisma/client'
import { UserRepositoryInterface } from '../interfaces/users-repository-interface'
import { randomUUID } from 'crypto'

export class InMemoryUsersRepository implements UserRepositoryInterface {
  private users: User[] = []
  async findByEmail(email: string): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user: User = {
      created_at: new Date(),
      email: data.email,
      name: data.name,
      password_hash: data.password_hash,
      id: randomUUID(),
    }

    this.users.push(user)

    return user
  }
}
