import { useMutation } from '@tanstack/react-query'
import authApis from '../apiRequests/auth.api'
import { removeTokensFromLocalStorage } from '../app/_utils/localStorage'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApis.login
  })
}

export const useLoginAdminMutation = () => {
  return useMutation({
    mutationFn: authApis.loginAdmin
  })
}

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApis.logout,
    onSuccess: () => {
      removeTokensFromLocalStorage()
    }
  })
}
