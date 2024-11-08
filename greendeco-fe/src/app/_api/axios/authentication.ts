import { User } from '@/src/app/_types/user.type'
import { http } from '@/src/app/_utils/http'

type RegisterData = {
  firstName: string
  identifier: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
}

type LoginData = {
  email: string
  password: string
}

type ResetPasswordData = {
  password: string
  token: string
}

export const registerAccount = async (newAccount: RegisterData) => {
  return await http.post('/auth/register', newAccount).then((res) => res.data)
}

export const loginAccount = async (account: LoginData) => {
  return await http
    .post<{ access_Token: string; user: User }>('/auth/login', account)
    .then((res) => res.data)
}

export const sendEmailToResetPassword = async ({ email }: { email: string }) => {
  return await http.post('/auth/forgot-password', { email }).then((res) => res.data)
}

export const resetPassword = async (resetPasswordData: ResetPasswordData) => {
  return await http
    .put(
      '/auth/password',
      { password: resetPasswordData.password },
      {
        headers: {
          Authorization: `Bearer ${resetPasswordData.token}`,
        },
      },
    )
    .then((res) => res.data)
}
