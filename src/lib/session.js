import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

const key = new TextEncoder().encode(process.env.SECRET)

const cookie = {
  name: 'session',
  options: {httpOnly: true, secure: true, sameSite: 'lax', path: '/'},
  duration: 24 * 60 * 60 * 1000
}

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1day')
    .sign(key)
}

export async function decrypt(session) {
  try {
    const {payload} = await jwtVerify(session, key, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    return null
  }
}

export async function createSession(userId) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ userId, expires })

  cookies().set(cookie.name, session, { ...cookie.options, expires })
  redirect('/')
}

export async function verifySession() {
  const userCookie = cookies().get(cookie.name)?.value
  const session = await decrypt(userCookie)
  if (!session?.userId) {
    // redirect('/login')
    return {userId: null}
  }
  return {userId: session.userId}
}

export async function deleteSession() {
  cookies().delete(cookie.name)
  redirect('/login')
}