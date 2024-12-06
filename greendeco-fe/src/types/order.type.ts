import { CartInfoData } from './cart.type'
import { ProductData, VariantData } from './product.type'
import { UserProfileResponseData } from './user.type'
import { OrderState as StateOfOrder } from '@/src/configs/constants/paramKeys'

type OrderState = 'draft' | 'processing' | 'completed' | 'cancelled'

export type CreateOrderData = {
  cart_id: CartInfoData['id']
  coupon_id?: string
  shipping_address: OrderData['shipping_address']
}

export type OrderData = {
  id: string
  owner_id: UserProfileResponseData['id']
  user_name: string
  user_email: UserProfileResponseData['email']
  shipping_address: string
  user_phone_number: UserProfileResponseData['phoneNumber']
  state: OrderState
  description: string
  coupon_id: string | null
  coupon_discount: number
  paid_at: string | null
  created_at: string
  updated_at: string
}

export type CreateOrderResponseData = {
  id: OrderData['id']
}

export type OrderListData = {
  items: OrderData[]
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type OrderDetailResponseData = {
  items: OrderData
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type OrderProductData = {
  id: string
  order_id: OrderData['id']
  variant_id: VariantData['id']
  variant_name: VariantData['name']
  variant_price: VariantData['price']
  quantity: number
  product_image: ProductData['images'][0] | undefined
  product_id: ProductData['id']
}

export type OrderProductList = {
  items: OrderProductData[]
}

export type OrderPrice = {
  actual_price: number
  total: number
}

export type OrderFullDetailData = {
  order: OrderData
  productList: OrderProductList['items']
  price: OrderPrice
}

export type OrderInfo = {
  order_id: string
  user_name: string
  userPhoneNumber: string
}

export type OrderStateTable = {
  order_id: string
  state: string
  owner_id: string
}

export type OrderTableData = {
  OrderData: OrderData
  owner_info: OrderInfo
  order_state: OrderStateTable
  OrderPrice: OrderPrice
}

export type OrderStatusRequest = {
  orderId: string
  state: string
  description?: string
}

export type ProcessStatusRequest = {
  orderId: string
  paid_at: string
  title: string
  message: string
  userId: string
  state: StateOfOrder
}

export type StatusRequest = {
  orderId: string
  title: string
  message: string
  userId: string
  state: StateOfOrder
}
