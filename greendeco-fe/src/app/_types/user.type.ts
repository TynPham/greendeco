export type User = {
  avatar: string | null
  email: string
  firstName: string
  id: string
  identifier: string
  lastName: string
  phoneNumber: string
  isAdmin: boolean
}

export type UserProfileResponseData = User & {
  id: string
}
