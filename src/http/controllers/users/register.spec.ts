import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'

describe('Register controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const response = await supertest(app.server).post('/users').send({
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'password123',
    })

    expect(response.statusCode).toBe(201)
  })
})
