import { cookies } from 'next/headers'

const COOKIE_POLICIES = {
  simple: ['SIMPLE-COOKIE', 'Just a simple cookie', {}],
  http: ['HTTP-ONLY-COOKIE', 'This is a cookie with httpOnly flag', { httpOnly: true }],
  secure: ['SECURE-COOKIE', 'This is a cookie with secure flag', { secure: true }],
  'http+secure': ['HTTP-ONLY+SECURE-COOKIE', 'This is a cookie with httpOnly and secure flag', { httpOnly: true, secure: true }],
}

export async function GET(request) {
  const cookie = cookies()
  const items = cookie.getAll()

  console.log('items:', items)

  return Response.json({ 
    ok: true, 
    items,
  })
}

export async function POST(request) {
  const { type = 'simple' } = await request.json()
  const cookie = cookies()
  const policy = COOKIE_POLICIES[type]

  cookie.set(...policy)

  return Response.json({ ok: true })
}
