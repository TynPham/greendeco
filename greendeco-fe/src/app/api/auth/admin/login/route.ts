import authApis from '@/src/apiRequests/auth.api'
import { LoginBodyType } from '@/src/types/auth'
import { decodeToken } from '@/src/utils/utils'
import { AxiosError, HttpStatusCode } from 'axios'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as LoginBodyType
  const cookieStore = cookies()

  try {
    const { data } = await authApis.sLogin(body)
    const { accessToken } = data
    const accessTokenDecoded = decodeToken(accessToken)
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
      expires: accessTokenDecoded.exp * 1000
    })

    return NextResponse.json(data, {
      status: HttpStatusCode.Ok
    })
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(error.response?.data, {
        status: error.status
      })
    }

    return NextResponse.json(
      {
        message: 'Internal Server Error'
      },
      {
        status: HttpStatusCode.InternalServerError
      }
    )
  }
}
