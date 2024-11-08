import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import path from './constants/path'
import { decodeToken } from './app/_utils/utils'

const authPaths = [path.login, path.register, path.loginAdministrator]
const privatePaths = [
  path.order,
  path.profile,
  path.purchased,
  path.productAdministrator,
  path.orderAdministrator,
  path.checkout,
  path.payment,
]
const adminPaths = [path.productAdministrator, path.orderAdministrator]
export function middleware(request: NextRequest) {
  const cookiesStore = request.cookies
  const pathname = request.nextUrl.pathname
  const accessToken = cookiesStore.get('accessToken')?.value
  const decodedAccessToken = accessToken ? decodeToken(accessToken) : null
  const isAuthenticated = !!accessToken && (decodedAccessToken?.exp ?? 0) * 1000 > Date.now()

  if (!isAuthenticated && privatePaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL(path.login, request.url))
  }

  if (isAuthenticated) {
    if (authPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(path.home, request.url))
    }

    const isAdmin = Boolean(decodedAccessToken?.admin)
    if (!isAdmin && adminPaths.some((path) => pathname.startsWith(path))) {
      return NextResponse.redirect(new URL(path.home, request.url))
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/administrator/:path*',
    '/orders/:path*',
    '/user/:path*',
    '/payment/:path*',
    '/profile/:path*',
    '/purchased/:path*',
    '/checkout/:path*',
    '/shop/:path*',
  ],
}
