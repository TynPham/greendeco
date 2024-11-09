'use server'

import { AxiosError } from 'axios'
import cartApis from '../apiRequests/cart.api'
import { NOT_FOUND_STATUS } from '../app/_configs/constants/status'
import { cookies } from 'next/headers'
import { CartListFullDetail } from '../app/_hooks/useCart'
import { CartItemListResponseData, CartItemWithFullVariantInfo } from '../app/_types/cart'
import productApis from '../apiRequests/product'

export const handleGetCartFullDetail = async (cartList: CartItemListResponseData) => {
  const fullInfoCartList = cartList.items.map(async (item) => {
    const variantInfo = await productApis.getVariantById(item.variant).then((data) => data)
    const itemWithVariantInfo: CartItemWithFullVariantInfo = {
      ...item,
      variant: variantInfo.data.items,
    }
    return itemWithVariantInfo
  })

  //NOTE: Invoke the Promise[] to get the CartItemWithFullVariantInfo[]
  return await Promise.all(fullInfoCartList).then((cartItemArray) => {
    const cartListFullDetail: CartListFullDetail = {
      ...cartList,
      items: cartItemArray,
    }
    return cartListFullDetail
  })
}

export async function getCartServer() {
  try {
    const accessToken = cookies().get('accessToken')?.value
    if (!accessToken) return undefined
    //NOTE: Handle getCartId - if there isn't any cart -> create new one
    const cartId = await cartApis
      .getCartUser(accessToken)
      .then((data) => data.data.items.id)
      .catch((e: AxiosError) => {
        if (e.response?.status === NOT_FOUND_STATUS) {
          // debugger
          return cartApis.createNewCart(accessToken).then((newCartId) => newCartId.data.id)
        }
      })
      .then((cartId) => {
        // console.log('cartId', cartId)
        // cookies().set('cartId', cartId ?? '', {
        //   sameSite: 'lax',
        //   secure: true,
        // })
        //   debugger
        return cartId
      })
    const result = await cartApis
      .getCartItemListFromCartId(cartId as string, accessToken)
      .then((cartListWithoutVariantInfo) => {
        if (cartListWithoutVariantInfo.data)
          return handleGetCartFullDetail(cartListWithoutVariantInfo.data)
      })

    return result
  } catch (error) {
    console.error('Failed to fetch cart:', error)
    return undefined
  }
}
