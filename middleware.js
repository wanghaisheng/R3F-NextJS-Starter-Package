import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export async function middleware(request) {
  const token = request.cookies.get('token')?.value
  const requestUrl = request.nextUrl.pathname
  const userId = token ? jwtDecode(token).id : ''

  // an array of protected routes
  const protectedRoutes = ['/slider', '/hero3', '/createavatar']

  // Check if the requested URL matches any of the protected routes
  const isProtectedRoute = protectedRoutes.some((route) => requestUrl.startsWith(route))

  // If it's a protected route and user has no token, redirect to signin
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (requestUrl.startsWith('/signin') && token) {
    return NextResponse.redirect(new URL('/createavatar', request.url))
  }

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }
}

//
export const config = {
  matcher: ['/slider', '/hero3', '/createavatar'],
}
