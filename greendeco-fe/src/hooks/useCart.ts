'use client'

import { getCookie } from 'cookies-next'
import { useQuery } from '@tanstack/react-query'
import { setCookie } from 'cookies-next'
import useCartDialog from './dialog/useCartDialog'
import { CONFLICT_STATUS, NOT_FOUND_STATUS } from '../configs/constants/status'
import { UseQueryKeys } from '../configs/constants/queryKey'
import cartApis from '@/src/apiRequests/cart.api'
import productApis from '@/src/apiRequests/product.api'
import { HttpError } from '../utils/http'
import {
  useAddCartItemMutation,
  useChangeItemQuantityMutation,
  useClearCartItemListMutation,
  useRemoveCartItemMutation
} from '@/src/queries/cart'
import {
  CartInfoData,
  CartItemData,
  CartItemListResponseData,
  CartItemWithFullVariantInfo,
  CartListFullDetail
} from '../types/cart.type'
import { VariantData } from '../types/product.type'

//NOTE: Go through the cartList to get Variant full information by Id
export const handleGetCartFullDetail = async (cartList: CartItemListResponseData) => {
  const fullInfoCartList = cartList.items.map(async (item) => {
    const variantInfo = await productApis.getVariantById(item.variant).then((data) => data.data)
    const itemWithVariantInfo: CartItemWithFullVariantInfo = {
      ...item,
      variant: variantInfo.items
    }
    return itemWithVariantInfo
  })

  //NOTE: Invoke the Promise[] to get the CartItemWithFullVariantInfo[]
  return await Promise.all(fullInfoCartList).then((cartItemArray) => {
    const cartListFullDetail: CartListFullDetail = {
      ...cartList,
      items: cartItemArray
    }
    return cartListFullDetail
  })
}

export function useCartQuery() {
  //NOTE: Handle getCartId - if there isn't any cart -> create new one
  const handleGetCartId = async () => {
    return await cartApis
      .getCartUser()
      .then((data) => data.data.items.id)
      .catch((e: HttpError) => {
        if (e.status === NOT_FOUND_STATUS) {
          return cartApis.createNewCart().then((newCartId) => newCartId.data.id)
        }
      })
      .then((cartId) => {
        setCookie('cartId', cartId, {
          sameSite: 'none',
          secure: true
        })
        return cartId
      })
  }

  const getCartListWithFullDetail = async () => {
    try {
      const existingCartId = getCookie('cartId')

      if (existingCartId) {
        const response = await cartApis.getCartItemListFromCartId(existingCartId)
        if (response?.data) {
          return handleGetCartFullDetail(response.data)
        }
      }

      // If no existing cart or failed to get cart items, create new cart
      const newCartId = await handleGetCartId()
      if (newCartId) {
        const response = await cartApis.getCartItemListFromCartId(newCartId)
        if (response?.data) {
          return handleGetCartFullDetail(response.data)
        }
      }
    } catch (error) {
      console.error('Error fetching cart details:', error)
    }
  }

  const cartQuery = useQuery({
    queryKey: [UseQueryKeys.User, 'cart'],
    queryFn: getCartListWithFullDetail,
    onError: () => {}
  })

  return {
    cartQuery: { ...cartQuery }
  }
}
export function useCartMutation() {
  const { openCart } = useCartDialog()

  const addCartItemMutation = useAddCartItemMutation({
    onSuccess: () => {
      openCart()
    },
    onError: (error: HttpError) => {
      error.status === CONFLICT_STATUS && openCart()
    }
  })

  const changeQuantityMutation = useChangeItemQuantityMutation()

  const removeCartItemMutation = useRemoveCartItemMutation()

  const clearCartItemMutation = useClearCartItemListMutation()

  const handleAddCartItem = (
    cart_id: CartInfoData['id'] | undefined,
    quantity: CartItemData['quantity'],
    variant_id: VariantData['id']
  ) => {
    if (cart_id) {
      addCartItemMutation.mutate({
        variant_id,
        cart_id,
        quantity
      })
    }
    // else {
    //   router.replace('/login')
    // }
  }

  const handleIncreaseQuantity = (
    itemId: CartItemData['id'],
    quantity: CartItemData['quantity']
  ) => {
    changeQuantityMutation.mutate({
      itemId: itemId,
      quantity: quantity + 1
    })
  }

  const handleDecreaseQuantity = (
    itemId: CartItemData['id'],
    quantity: CartItemData['quantity']
  ) => {
    if (quantity > 1)
      changeQuantityMutation.mutate({
        itemId: itemId,
        quantity: quantity - 1
      })
    if (quantity === 1) {
      handleRemoveCartItem(itemId)
    }
  }

  const handleRemoveCartItem = (itemId: CartItemData['id']) => {
    removeCartItemMutation.mutate({
      itemId: itemId
    })
  }

  const handleClearCartList = (cartId: string) => {
    clearCartItemMutation.mutate({
      cartId: cartId
    })
  }

  return {
    addCartItem: {
      handle: handleAddCartItem,
      loading: addCartItemMutation.isLoading
    },

    changeQuantity: {
      increase: handleIncreaseQuantity,
      decrease: handleDecreaseQuantity,
      loading: changeQuantityMutation.isLoading
    },
    removeCartItem: handleRemoveCartItem,
    clearCartItem: handleClearCartList
  }
}
