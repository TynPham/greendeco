import { User } from '@/app/_types/user.type'
import { http } from '@/app/_utils/http'

export type UserProfileResponseData = {
	id: string
	avatar: string | null
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

export type UserProfileUpdateData = {
	avatar: string | null
	firstName: string
	lastName: string
	email: string
	phoneNumber: string
}

export type UserProfileUpdateRequest = {
	profile: UserProfileUpdateData
}

export const getUserProfile = async (token: string) => {
	return await http
		.get<User>('/user/me', { headers: { Authorization: `Bearer ${token}` } })
		.then((res) => res.data)
}
export const updateUserProfile = async (data: UserProfileUpdateRequest) => {
	const { profile } = data
	return await http.put<User>('/user/update', profile).then((res) => res.data)
}
