import { User } from './user.type'

export type LoginBodyType = {
  email: string
  password: string
}

export type LoginResType = {
  accessToken: string
  user: User
}

export type RegisterBodyType = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  password: string
  identifier: string
}

export type RegisterResType = {
  message: string
}
