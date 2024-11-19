import { User } from '../app/_types/user.type'
import { http } from '../app/_utils/http'

const UserApis = {
  sGetUserProfile: (token: string) =>
    http.get<User>('/user/me', { headers: { Authorization: `Bearer ${token}` } })
}

export default UserApis
