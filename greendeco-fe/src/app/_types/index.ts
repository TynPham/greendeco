export type AccessTokenType = string | undefined

export type TokenPayloadType = {
  admin: boolean
  exp: number
  user_id: string
}
