import { UseQueryKeys } from '../configs/constants/queryKey'
import notificationApis from '../apiRequests/notification.api'
import { useQuery } from '@tanstack/react-query'
import { FilterParams } from '../types'

export const useNotificationQuery = (params?: FilterParams) => {
  return useQuery({
    queryKey: [UseQueryKeys.User, UseQueryKeys.Notification],
    queryFn: () => notificationApis.getNotificationFromUser(params)
  })
}
