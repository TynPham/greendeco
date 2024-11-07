import { useMutation } from '@tanstack/react-query'
import authApis from '../apiRequests/auth.api'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApis.login,
  })
}
