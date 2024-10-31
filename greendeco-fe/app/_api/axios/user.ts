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
	accessToken: string | undefined
	profile: UserProfileUpdateData
}

export const getUserProfile = async () => {
	return await http.get<UserProfileResponseData>('/user/me').then((res) => res.data)
}
export const updatetUserProfile = async (data: UserProfileUpdateRequest) => {
	const { profile } = data
	return await http.put<UserProfileResponseData>('/user/update', profile).then((res) => res.data)
}
