import axios from 'axios'
import { userApi } from '../user'

const USER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`

type AdminAccessTokenType = string | undefined

type UserData = {
	id: string
	email: string
	identifier: string
	firstName: string
	lastName: string
	phoneNumber: string
	avatar: string | null
}

export const GetUserById = async (accessToken: AdminAccessTokenType, userId: string) => {
	return await userApi
		.get<UserData>(`/${userId}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}
