import { decode } from 'jsonwebtoken'
import { TokenPayloadType } from '../_types'

export const decodeToken = (token: string) => decode(token) as TokenPayloadType
