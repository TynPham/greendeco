import { User } from './user.type'

export type LoginBodyType = {
  email: string
  password: string
}

export type LoginResType = {
  accessToken: string
  user: User
}
