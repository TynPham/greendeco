import axios from 'axios'

class ClientToken {
	private token: string

	public constructor() {
		this.token = ''
	}

	setToken(token: string) {
		if (typeof window === 'undefined') {
			throw new Error('Cannot set access token on server side')
		}
		this.token = token
	}

	getToken() {
		return this.token
	}
}

export const clientToken = new ClientToken()

export const http = axios.create({
	baseURL: process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
})

http.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		const accessToken = clientToken.getToken()
		if (accessToken) {
			config.headers['Authorization'] = `Bearer ${accessToken}`
		}
		return config
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error)
	},
)

// Add a response interceptor
http.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error)
	},
)
