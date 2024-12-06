import { LoginBodyType, LoginResType, RegisterBodyType, RegisterResType } from '../types/auth'
import { http } from '../utils/http'

const authApis = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseURL: ''
    }),
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),

  loginAdmin: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/admin/login', body, {
      baseURL: ''
    }),
  sLoginAdmin: (body: LoginBodyType) => http.post<LoginResType>('/admin/login', body),

  register: (body: RegisterBodyType) => http.post<RegisterResType>('/auth/register', body),

  logout: () =>
    http.post<{ message: string }>('/api/auth/logout', null, {
      baseURL: ''
    }),

  sendEmailToResetPassword: (body: { email: string }) =>
    http.post<{ message: string }>('/auth/forgot-password', body),

  resetPassword: ({ password }: { password: string }) => http.put('/auth/password', { password })
}

export default authApis
