import axios, { AxiosError, HttpStatusCode } from 'axios'
import { LoginResType } from '../_types/auth'
import {
  getAccessTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  setAccessTokenToLocalStorage
} from './localStorage'
import authApis from '@/src/apiRequests/auth.api'
import path from '@/src/constants/path'
import { redirect } from 'next/navigation'

type HttpErrorPayload = {
  msg: string
  [key: string]: any
}

type UnprocessableEntityErrorPayload = HttpErrorPayload & {
  errors: {
    [key: string]: string
  }
}

export class HttpError extends Error {
  status: number
  payload: {
    msg: string
    [key: string]: any
  }
  constructor(status: number, payload: HttpErrorPayload) {
    super(payload.msg)
    this.status = status
    this.payload = payload
  }
}

export class UnprocessableEntityError extends HttpError {
  status = HttpStatusCode.UnprocessableEntity
  payload: UnprocessableEntityErrorPayload
  constructor(payload: UnprocessableEntityErrorPayload) {
    super(HttpStatusCode.UnprocessableEntity, payload)
    this.payload = payload
  }
}

const isClient = typeof window !== 'undefined'
export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

http.interceptors.request.use(
  function (config) {
    const baseUrl =
      config.baseURL === '' ? process.env.NEXT_PUBLIC_GREENDECO_NEXT_SERVER : config.baseURL
    config.baseURL = baseUrl
    // Do something before request is sent
    if (isClient) {
      const accessToken = getAccessTokenFromLocalStorage()
      if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
      }
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
http.interceptors.response.use(
  function (response) {
    if (isClient) {
      const url = response.config.url ?? ''
      if (['/api/auth/login', '/api/auth/admin/login'].includes(url)) {
        const { accessToken } = response.data as LoginResType
        setAccessTokenToLocalStorage(accessToken)
      } else if (['/api/auth/logout'].includes(url)) {
        removeTokensFromLocalStorage()
      }
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  async function (error) {
    let clientLogoutRequest: null | (() => Promise<any>) = null
    if (error instanceof AxiosError) {
      try {
        if (error.response?.status === HttpStatusCode.UnprocessableEntity) {
          throw new UnprocessableEntityError(error.response?.data)
        }

        if (error.response?.status === HttpStatusCode.Unauthorized) {
          if (!clientLogoutRequest) {
            clientLogoutRequest = authApis.logout
          }

          try {
            await clientLogoutRequest
          } catch {
            console.log('logout error')
          } finally {
            clientLogoutRequest = null
            if (isClient) {
              location.href = path.login
            } else {
              redirect(path.login)
            }
          }
        }

        throw new HttpError(error.response?.status ?? 500, error.response?.data)
      } catch (err) {
        throw err
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)
