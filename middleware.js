import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const allowedOrigins = [
  'https://www.goinggenius.com.np',
  'https://my-weather-app-topaz.vercel.app',
  'https://r3-f-next-js-starter-package.vercel.app',
  'http://localhost:3000',
]

// Function to verify JWT token
function verifyToken(token) {
  try {
    const secret = process.env.JWT_SECRET // Ensure you have JWT_SECRET in your environment variables
    return jwt.verify(token, secret)
  } catch (err) {
    return null
  }
}

export function middleware(request) {
  const token = request.cookies.get('token')?.value
  const requestUrl = request.nextUrl.pathname
  const origin = request.headers.get('origin')

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
  const protectedRoutes = ['/slider']

  // Check if the requested URL matches any of the protected routes
  const isProtectedRoute = protectedRoutes.some((route) => requestUrl.startsWith(route))

  // If it's a protected route, validate the token
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/discover', request.url))
    }
    // Validate the token
    const verifiedToken = verifyToken(token)

    if (!verifiedToken) {
      return NextResponse.redirect(new URL('/discover', request.url))
    }
  }

  return NextResponse.next()
}

// Matcher to apply the middleware to specific routes
export const config = {
  matcher: ['/slider'],
}
