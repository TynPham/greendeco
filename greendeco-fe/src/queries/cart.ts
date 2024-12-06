import { useMutation, useQueryClient } from '@tanstack/react-query'
import cartApis from '../apiRequests/cart.api'
import { HttpError } from '../utils/http'
import { UseQueryKeys } from '../configs/constants/queryKey'

export const useAddCartItemMutation = ({
  onSuccess,
  onError
}: {
  onSuccess?: () => void
  onError?: (error: HttpError) => void
}) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartApis.addCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
      onSuccess && onSuccess()
    },
    onError: (error: HttpError) => {
      onError && onError(error)
    }
  })
}

export const useChangeItemQuantityMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartApis.changeCartItemQuantity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
    }
  })
}

export const useClearCartItemListMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartApis.clearCartItemList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
    }
  })
}

export const useRemoveCartItemMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: cartApis.removeCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
    }
  })
}
