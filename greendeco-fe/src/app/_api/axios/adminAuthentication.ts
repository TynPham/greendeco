import { http } from '@/src/app/_utils/http'

type LoginData = {
  email: string
  password: string
}

type LoginResponseData = {
  access_Token: string
}

export const loginAdminAccount = async (account: LoginData) => {
  return await http.post<LoginResponseData>('/admin/login', account).then((res) => res.data)
}
