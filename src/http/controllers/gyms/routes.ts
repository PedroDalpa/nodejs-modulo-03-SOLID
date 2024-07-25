import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from '../users/authenticate'
import { profile } from './profile'
import { verifyJWT } from '../../middlewares/verify-jwt'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)
}
