import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { decrypt } from './lib/session'

export default async function middleware(req) {
  // Check if route is protected
  const protectedRoutes = ['/dashboard']
  const currentPath = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(currentPath)

  if (isProtectedRoute) {
    // Check for valid session
    const cookie = cookies().get('session')?.value
    const session = await decrypt(cookie)

    //Redirect unauthorized users
    if (!session?.userId) {
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
  }

  //Render Route
  return NextResponse.next()
}

//Routes middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}
