import supertest from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'
import { prisma } from '@/lib/prisma'

describe('Validate check-in controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser()

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

    await supertest(app.server)
      .post(`/gyms/${gyms[0].id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: 10,
        userLongitude: 10,
      })

    const { id } = await prisma.checkIn.findFirstOrThrow({})

    const response = await supertest(app.server)
      .patch(`/check-ins/${id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        userLatitude: 10,
        userLongitude: 10,
      })

    expect(response.statusCode).toBe(204)

    const { validated_at } = await prisma.checkIn.findFirstOrThrow({
      where: { id },
    })

    expect(validated_at).toEqual(expect.any(Date))
  })
})
