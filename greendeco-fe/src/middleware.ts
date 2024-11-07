import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import path from './constants/path'

const authPaths = ['/login', '/register']
const privatePaths = ['/orders']
const authAdminPaths = ['/administrator/login']
export function middleware(request: NextRequest) {
  const cookiesStore = request.cookies
  const accessToken = cookiesStore.get('accessToken')?.value
  const pathname = request.nextUrl.pathname
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path))
  const isAuthAdminPath = authAdminPaths.some((path) => pathname.startsWith(path))
  const isPrivatePath = privatePaths.some((path) => pathname.startsWith(path))
  const isAuthenticated = !!accessToken

  if (!isAuthenticated && isPrivatePath) {
    return NextResponse.redirect(new URL(path.login, request.url))
  }

  if (isAuthenticated && isAuthPath) {
    return NextResponse.redirect(new URL(path.home, request.url))
  }

  if (isAuthenticated && isAuthAdminPath) {
    return NextResponse.redirect(new URL('/administrator', request.url))
  }
  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login', '/register', '/administrator/login', '/orders'],
}
