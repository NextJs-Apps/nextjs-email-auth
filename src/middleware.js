import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { decrypt } from './lib/session'

export default async function middleware(req) {
  // Check if route is protected
  const protectedRoutes = ['/', '/profile']
  const loggedInRoutes = ['/login', '/signup']
  const currentPath = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(currentPath)
  const isLoggedInRoute = loggedInRoutes.includes(currentPath)

  // Check for valid session
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute) {
    //Redirect unauthorized users
    if (!session?.userId) {
      // console.log(new URL('/login', req.nextUrl))
      return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    // Redirect loggedIn user from login or sigup page
  }
  if (isLoggedInRoute && session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  //Render Route
  return NextResponse.next()
}

//Routes middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)'],
}
