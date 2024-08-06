import { FastifyReply, FastifyRequest } from 'fastify'

export async function refreshToken(req: FastifyRequest, res: FastifyReply) {
  await req.jwtVerify({ onlyCookie: true })

  const { role, sub } = req.user

  const token = await res.jwtSign(
    { role },
    {
      sign: {
        sub,
      },
    },
  )

  const refreshToken = await res.jwtSign(
    { role },
    {
      sign: {
        sub,
        expiresIn: '7d',
      },
    },
  )

  return res
    .status(200)
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .send({ token })
}
