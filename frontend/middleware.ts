import { NextFetchEvent, NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest, response: NextFetchEvent) {

  const token = request.cookies.get('token')
  if (token?.value == '' || token?.value == 'undefined') {
    return NextResponse.redirect(new URL('/login', request.url))

  }
}

export const config = {
  matcher: ['/user', '/friends', '/deeds', '/profile', '/'],
}