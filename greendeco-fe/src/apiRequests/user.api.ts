import { User, UserProfileUpdateRequest } from '../types/user.type'
import { http } from '../utils/http'

const userApis = {
  sGetUserProfile: (token: string) =>
    http.get<User>('/user/me', { headers: { Authorization: `Bearer ${token}` } }),

  updateUserProfile: (data: UserProfileUpdateRequest) => http.put<User>('/user/update', data)
}

export default userApis
