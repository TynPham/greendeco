import { http } from '@/src/utils/http'

const mediaApis = {
  uploadImage: (file: FormData) =>
    http.post('/media/upload', file, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
}

export default mediaApis
