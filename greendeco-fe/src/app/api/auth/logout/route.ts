import { HttpStatusCode } from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = cookies()

  cookieStore.delete('accessToken')
  cookieStore.delete('cartId')

  return NextResponse.json({ message: 'Logout successfully' }, { status: HttpStatusCode.Ok })
}
