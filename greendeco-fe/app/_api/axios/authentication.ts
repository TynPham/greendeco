import { LoginFormInputType } from '@/app/_configs/schemas/authentication'
import { User } from '@/app/_types/user.type'
import axios from 'axios'

const AUTHENTICATION_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/auth`

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

export const authApi = axios.create({
	baseURL: AUTHENTICATION_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const registerAccount = async (newAccount: RegisterData) => {
	return await authApi.post('/register', newAccount).then((res) => res.data)
}

export const loginAccount = async (account: LoginData) => {
	return await authApi
		.post<{ access_Token: string; user: User }>('/login', account)
		.then((res) => res.data)
}

export const sendEmailToResetPassword = async ({ email }: { email: string }) => {
	return await authApi.post('/forgot-password', { email }).then((res) => res.data)
}

export const resetPassword = async (resetPasswordData: ResetPasswordData) => {
	return await authApi
		.put(
			'/password',
			{ password: resetPasswordData.password },
			{
				headers: {
					Authorization: `Bearer ${resetPasswordData.token}`,
				},
			},
		)
		.then((res) => res.data)
}
