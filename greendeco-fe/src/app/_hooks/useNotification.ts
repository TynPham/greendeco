import { useQuery } from '@tanstack/react-query'
import { FilterParams } from '../_api/axios/product'
import { UseQueryKeys } from '../_configs/constants/queryKey'
import { Sort, SortBy } from '../_configs/constants/paramKeys'
import { getNotificationFromUser } from '../_api/axios/notification'
import { type } from 'os'

const defaultParams: FilterParams = {
  limit: 10,
  sort: Sort.Descending,
  sortBy: SortBy.CreatedAt,
}

export default function useNotification({
  params = {
    ...defaultParams,
  },
}: {
  params?: FilterParams
}) {
  const userNotificationQuery = useQuery({
    queryKey: [UseQueryKeys.User, UseQueryKeys.Notification],
    queryFn: () => getNotificationFromUser(params),
  })

  return { userNotificationQuery: userNotificationQuery }
}
