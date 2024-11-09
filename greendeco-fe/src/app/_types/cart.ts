import { VariantData } from './product.type'
import { UserProfileResponseData } from './user.type'

export type CartInfoData = {
  id: string
  owner: UserProfileResponseData['id']
  description: string
  created_at: string
  updated_at: string
}

export type CartUserResponseData = {
  items: CartInfoData
  page: number
  page_size: number
  next: Boolean
  prev: Boolean
}

export type CreateNewCartResponseData = {
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

export type CartItemWithFullVariantInfo = {
  id: CartItemData['id']
  cart: CartInfoData['id']
  variant: VariantData
  quantity: number
  created_at: string
  updated_at: string
}

export type CartListFullDetail = {
  items: CartItemWithFullVariantInfo[]
  page: number
  page_size: number
  next: Boolean
  prev: Boolean
}
