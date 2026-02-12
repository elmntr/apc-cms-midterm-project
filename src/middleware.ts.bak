import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip auth for API routes if needed
  if (request.nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  const authHeader = request.headers.get('authorization')

  if (!authHeader) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="The Unseen Journey"',
      },
    })
  }

  try {
    const base64Credentials = authHeader.split(' ')[1]
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
    const [username, password] = credentials.split(':')

    const validUser = process.env.SITE_USERNAME || 'admin'
    const validPass = process.env.SITE_PASSWORD || 'password123'

    if (username === validUser && password === validPass) {
      return NextResponse.next()
    }
  } catch {
    // Invalid auth header format
  }

  return new NextResponse('Invalid credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="The Unseen Journey"',
    },
  })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
