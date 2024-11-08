import { LoginBodyType, LoginResType } from '../app/_types/auth'
import { http } from '../app/_utils/http'

const authApis = {
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseURL: '',
    }),
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),

  loginAdmin: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/admin/login', body, {
      baseURL: '',
    }),
  sLoginAdmin: (body: LoginBodyType) => http.post<LoginResType>('/admin/login', body),

  logout: () =>
    http.post<{ message: string }>('/api/auth/logout', null, {
      baseURL: '',
    }),
}

export default authApis
