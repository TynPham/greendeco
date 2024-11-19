import { http } from '@/src/app/_utils/http'

export const uploadImage = async (file: FormData) => {
  return await http
    .post('/media/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
}
