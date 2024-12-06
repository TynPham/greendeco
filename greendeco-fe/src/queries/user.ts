import { useMutation } from '@tanstack/react-query'
import userApis from '../apiRequests/user.api'

export const useUpdateUserProfileMutation = () => {
  return useMutation({
    mutationFn: userApis.updateUserProfile
  })
}
