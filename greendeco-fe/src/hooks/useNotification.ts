import { Sort, SortBy } from '../configs/constants/paramKeys'
import { useNotificationQuery } from '@/src/queries/notification'
import { FilterParams } from '../types'

const defaultParams: FilterParams = {
  limit: 10,
  sort: Sort.Descending,
  sortBy: SortBy.CreatedAt
}

export default function useNotification({
  params = {
    ...defaultParams
  }
}: {
  params?: FilterParams
}) {
  const userNotificationQuery = useNotificationQuery(params)

  return { userNotificationQuery: userNotificationQuery }
}
