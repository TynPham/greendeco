import { TokenType } from '@/src/constants/token'

const isClient = typeof window !== 'undefined'

export const getAccessTokenFromLocalStorage = () =>
  isClient ? localStorage.getItem(TokenType.ACCESS_TOKEN) : null

export const setAccessTokenToLocalStorage = (value: string) =>
  isClient && localStorage.setItem(TokenType.ACCESS_TOKEN, value)

export const removeTokensFromLocalStorage = () => {
  isClient && localStorage.removeItem(TokenType.ACCESS_TOKEN)
}
