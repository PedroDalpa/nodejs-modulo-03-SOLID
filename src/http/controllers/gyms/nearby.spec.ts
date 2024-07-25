import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create gym controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register', async () => {
    const { token } = await createAndAuthenticateUser()

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -21.2705946,
        longitude: -50.3173257,
        phone: '123',
        title: 'title',
        description: 'description',
      })

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 10,
        longitude: 10,
        phone: '123',
        title: 'gym',
        description: 'description',
      })

    const response = await supertest(app.server)
      .get('/gyms/nearby')
      .set('Authorization', `Bearer ${token}`)
      .query({
        userLatitude: -21.2617546,
        userLongitude: -50.3312838,
      })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        gyms: expect.arrayContaining([
          expect.objectContaining({ title: 'title' }),
        ]),
      }),
    )
    expect(response.body.gyms).toHaveLength(1)
  })
})
