import axios from 'axios'

const AUTHENTICATION_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/admin`

type LoginData = {
	email: string
	password: string
}

type LoginResponseData = {
	access_Token: string
}

export const authApi = axios.create({
	baseURL: AUTHENTICATION_URL,
})

authApi.defaults.headers.common['Content-Type'] = 'application/json'

export const loginAdminAccount = async (account: LoginData) => {
	return await authApi.post<LoginResponseData>('/login', account).then((res) => res.data)
}
