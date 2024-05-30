import { NextResponse } from 'next/server'

// The list of all allowed origins
const allowedOrigins = [
  'https://www.goinggenius.com.np',
  'https://my-weather-app-topaz.vercel.app',
  'http://localhost:3001',
]

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const requestUrl = request.nextUrl.pathname
  const origin = request.headers.get('origin')

  console.log('Request Origin:', origin)

  // Handle CORS for '/api/public/:path*'
  if (requestUrl.startsWith('/api/public/')) {
    const res = NextResponse.next()

    if (allowedOrigins.includes(origin)) {
      res.headers.set('Access-Control-Allow-Credentials', process.env.ACCESS_CONTROL_ALLOW_CREDENTIALS)
      res.headers.set('Access-Control-Allow-Origin', origin)
      res.headers.set('Access-Control-Allow-Methods', process.env.ACCESS_CONTROL_ALLOW_METHODS)
      res.headers.set('Access-Control-Allow-Headers', process.env.ACCESS_CONTROL_ALLOW_HEADERS)
    } else {
      return new NextResponse('Origin not allowed', { status: 403 })
    }

    return res
  }

  // Define protected routes
  const protectedRoutes = ['/slider', '/hero3', '/createavatar']

  // Check if the requested URL matches any of the protected routes
  const isProtectedRoute = protectedRoutes.some((route) => requestUrl.startsWith(route))

  // If it's a protected route and user has no token, redirect to signin
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

// Matcher to apply the middleware to specific routes
export const config = {
  matcher: ['/api/public/:path*', '/slider', '/hero3', '/createavatar'],
}
