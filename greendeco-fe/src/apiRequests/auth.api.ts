import { LoginBodyType, LoginResType } from '../app/_types/auth'
import { http } from '../app/_utils/http'

const authApis = {
  sLogin: (body: LoginBodyType) => http.post<LoginResType>('/auth/login', body),
  login: (body: LoginBodyType) =>
    http.post<LoginResType>('/api/auth/login', body, {
      baseURL: '',
    }),
}

export default authApis
