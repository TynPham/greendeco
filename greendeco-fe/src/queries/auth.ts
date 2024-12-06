import { useMutation } from '@tanstack/react-query'
import authApis from '../apiRequests/auth.api'
import { removeTokensFromLocalStorage } from '../utils/localStorage'

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

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: authApis.register
  })
}

export const useSendEmailToResetPasswordMutation = () => {
  return useMutation({
    mutationFn: authApis.sendEmailToResetPassword
  })
}

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: authApis.resetPassword
  })
}
