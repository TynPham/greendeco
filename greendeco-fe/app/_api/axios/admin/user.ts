import { http } from '@/app/_utils/http'

type UserData = {
	id: string
	email: string
	identifier: string
	firstName: string
	lastName: string
	phoneNumber: string
	avatar: string | null
}

export const GetUserById = async (userId: string) => {
	return await http.get<UserData>(`/${userId}`).then((res) => res.data)
}
