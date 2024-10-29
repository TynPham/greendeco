import axios from 'axios'

const MEDIA_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/media`

export const mediaApi = axios.create({
	baseURL: MEDIA_URL,
})

mediaApi.defaults.headers.common['Content-Type'] = 'multipart/form-data'

export const uploadImage = async (file: FormData) => {
	return await mediaApi.post('/upload', file).then((res) => res.data)
}
