import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'
import { refreshToken } from './refresh-token'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/auth', authenticate)

  app.patch('/token/refresh', refreshToken)

  // ***** Authenticated ***** //

  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
