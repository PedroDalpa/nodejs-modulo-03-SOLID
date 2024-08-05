import supertest from 'supertest'
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Check-in history controller', () => {
  beforeAll(async () => {
    await app.ready()

    vi.useFakeTimers()
  })

  afterEach(async () => {
    vi.useRealTimers()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to list the history of check-ins', async () => {
    const { token } = await createAndAuthenticateUser()
    const { token: anotherUser } =
      await createAndAuthenticateUser('test@example.com')

    await supertest(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: 10,
        longitude: 10,
        phone: '123',
        title: 'title',
        description: 'description',
      })

    const createGymResponse = await supertest(app.server)
      .get('/gyms/search')
      .set('Authorization', `Bearer ${token}`)
      .query({ name: 'tit' })
      .send()

    const { gyms } = createGymResponse.body

    for (let day = 1; day <= 3; day++) {
      vi.setSystemTime(new Date(2024, 6, day, 8, 0, 0))

      await supertest(app.server)
        .post(`/gyms/${gyms[0].id}/check-ins`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userLatitude: 10,
          userLongitude: 10,
        })

      await supertest(app.server)
        .post(`/gyms/${gyms[0].id}/check-ins`)
        .set('Authorization', `Bearer ${anotherUser}`)
        .send({
          userLatitude: 10,
          userLongitude: 10,
        })
    }

    const response = await supertest(app.server)
      .get('/check-ins/history')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body?.checkIns).toHaveLength(3)
  })
})
