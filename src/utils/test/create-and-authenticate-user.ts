import { app } from '@/app'
import supertest from 'supertest'

export async function createAndAuthenticateUser(
  email = 'john.doe@example.com',
) {
  await supertest(app.server).post('/users').send({
    name: 'John Doe',
    email,
    password: 'password123',
  })

  const { body } = await supertest(app.server).post('/auth').send({
    email,
    password: 'password123',
  })

  const token: string = body?.token

  return { token }
}
