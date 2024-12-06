import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import orderApis, {
  getOrderFullDetailById,
  getOrderListTable,
  updateOrderProcessStatus,
  updateOrderStatusSendNoti
} from '../apiRequests/order.api'
import { CreateOrderResponseData, OrderData } from '../types/order.type'
import { AxiosError } from 'axios'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '../configs/constants/queryKey'
import { FilterParams } from '../types'

export const useCreateOrderMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: (data: CreateOrderResponseData) => void
  onError?: (error: AxiosError) => void
}) => {
  return useMutation({
    mutationFn: orderApis.createOrder,
    onSuccess: (data) => {
      onSuccess && onSuccess(data.data)
    },
    onError: (error: AxiosError) => {
      onError && onError(error)
    }
  })
}

export const useGetOrderListByUserQuery = ({
  params,
  queryObject,
  role
}: {
  params?: FilterParams
  queryObject?: { [k: string]: string }
  role?: 'user' | 'admin'
}) => {
  return useQuery({
    queryKey: [
      role === 'user' ? UseQueryKeys.User : ADMIN_QUERY_KEY,
      UseQueryKeys.Order,
      ...Object.values(queryObject || {}),
      ...Object.values(params || {})
    ],
    queryFn: () => orderApis.getOrderList({ ...params, ...queryObject }, role)
  })
}

export const useGetOrderPriceQuery = ({
  id,
  onError
}: {
  id: OrderData['id']
  onError?: (error: AxiosError) => void
}) => {
  return useQuery({
    queryKey: [UseQueryKeys.User, UseQueryKeys.Order, id],
    queryFn: () => orderApis.getOrderPrice(id),
    onError: (error: AxiosError) => {
      onError && onError(error)
    }
  })
}

export const useGetOrderFullDetailByIdQuery = ({ id }: { id: OrderData['id'] }) => {
  return useQuery({
    queryKey: [UseQueryKeys.Order, id],
    queryFn: () => getOrderFullDetailById(id)
  })
}

export const useGetOrderListTableQuery = ({ params }: { params?: FilterParams }) => {
  return useQuery({
    queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order, ...Object.values(params || {})],
    queryFn: () => getOrderListTable(params)
  })
}

export const useUpdateOrderProcessStatusMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateOrderProcessStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order] })
    }
  })
}

export const useUpdateOrderStatusSendNotiMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateOrderStatusSendNoti,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order] })
    }
  })
}
