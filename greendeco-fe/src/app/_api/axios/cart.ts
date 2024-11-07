import { AccessTokenType } from '@/src/app/_types'
import { UserProfileResponseData } from './user'
import { VariantData } from './product'
import { http } from '@/src/app/_utils/http'

export type CartInfoData = {
  id: string
  owner: UserProfileResponseData['id']
  description: string
  created_at: string
  updated_at: string
}

type CartInfoFromUserResponseData = {
  items: CartInfoData
  page: number
  page_size: number
  next: Boolean
  prev: Boolean
}

type CreateNewCartResponseData = {
  id: CartInfoData['id']
}

export type CartItemData = {
  id: string
  cart: CartInfoData['id']
  variant: VariantData['id']
  quantity: number
  created_at: string
  updated_at: string
}

export type CartItemListResponseData = {
  items: CartItemData[]
  page: number
  page_size: number
  next: Boolean
  prev: Boolean
}

type AddItemRequestData = {
  itemData: ItemAddData
  accessToken: AccessTokenType
}

type ItemAddData = {
  cart_id: CartInfoData['id']
  quantity: number
  variant_id: VariantData['id']
}

type AddItemResponseData = {
  id: CartItemData['id']
}

type ChangeItemQuantityRequestData = {
  itemId: CartItemData['id']
  quantity: number
  accessToken: AccessTokenType
}

type RemoveItemCartRequestData = {
  itemId: CartItemData['id']
  accessToken: AccessTokenType
}

type ClearItemCartResquestData = {
  cartId: CartInfoData['id']
  accessToken: AccessTokenType
}

export const getCartInfoFromUser = async () => {
  return await http.get<CartInfoFromUserResponseData>('/cart').then((res) => res.data)
}

export const createNewCart = async () => {
  return await http
    .post<CreateNewCartResponseData>('/cart', {
      //NOTE: In the future, the description will have username + Cart
      description: 'User Cart',
    })
    .then((res) => res.data)
}

export const getCartItemListFromCartId = async (cartId: string) => {
  return await http.get<CartItemListResponseData>(`/cart/${cartId}/product`).then((res) => res.data)
}

export const addCartItem = async (data: AddItemRequestData) => {
  const { itemData } = data
  return await http.post<CartItemListResponseData>('/cart/product', { ...itemData })
}

export const changeCartItemQuantity = async (data: ChangeItemQuantityRequestData) => {
  const { itemId, quantity } = data
  return await http.put(`/cart/product/${itemId}`, {
    quantity: quantity,
  })
}

export const removeCartItem = async (data: RemoveItemCartRequestData) => {
  const { itemId } = data
  return await http.delete(`/cart/product/${itemId}`)
}

export const clearCartItemList = async (data: ClearItemCartResquestData) => {
  const { cartId } = data
  return await http.delete(`/cart/${cartId}/clear`)
}
