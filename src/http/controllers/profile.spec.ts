import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Profile controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    await supertest(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const { body } = await supertest(app.server).post('/auth').send({
      email: 'john.doe@example.com',
      password: 'password123',
    })

    const response = await supertest(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${body?.token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      user: expect.objectContaining({
        email: 'john.doe@example.com',
      }),
    })
  })
})
