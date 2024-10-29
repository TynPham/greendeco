import axios from 'axios'

const USER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/user`

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

export const userApi = axios.create({
	baseURL: USER_URL,
})

userApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getUserProfile = async (accessToken: string | undefined) => {
	return await userApi
		.get<UserProfileResponseData>('/me', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}
export const updatetUserProfile = async (data: UserProfileUpdateRequest) => {
	const { profile, accessToken } = data
	return await userApi
		.put<UserProfileResponseData>('/update', profile, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}
