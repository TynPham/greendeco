import { useMutation } from '@tanstack/react-query'
import mediaApis from '../apiRequests/media.api'

export const useUploadImageMutation = ({ onSuccess }: { onSuccess?: (data: string) => void }) => {
  return useMutation({
    mutationFn: mediaApis.uploadImage,
    onSuccess: (data) => {
      onSuccess && onSuccess(data.data)
    }
  })
}
