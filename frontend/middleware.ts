import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest, response: NextFetchEvent) {
  console.log('MIDDLEWARE')

  console.log(request.cookies.getAll())
  const token = request.cookies.get('token')
  if (token?.value == '' || token?.value == 'undefined') {
    return NextResponse.redirect(new URL('/login', request.url))

  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/user', '/friends', '/deeds', '/profile'],
}