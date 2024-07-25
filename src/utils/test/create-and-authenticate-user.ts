import { app } from '@/app'
import supertest from 'supertest'

export async function createAndAuthenticateUser() {
  await supertest(app.server).post('/users').send({
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
  })

  const { body } = await supertest(app.server).post('/auth').send({
    email: 'john.doe@example.com',
    password: 'password123',
  })

  const token: string = body?.token

  return { token }
}
