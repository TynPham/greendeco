'use client'

import axios, { AxiosError } from 'axios'
import { CartInfoData } from './cart'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/app/_configs/constants/cookies'
import { UserProfileResponseData } from './user'
import {
  FilterParams,
  ProductData,
  VariantData,
  fieldJSONParse,
  getProductBaseById,
} from './product'
import { BAD_REQUEST_STATUS } from '@/src/app/_configs/constants/status'
import { http } from '@/src/app/_utils/http'

type OrderState = 'draft' | 'processing' | 'completed' | 'cancelled'

export type CreateOrderData = {
  cart_id: CartInfoData['id']
  coupon_id?: string
  shipping_address: OrderData['shipping_address']
}

type CreateOrderRequestData = {
  createOrderData: CreateOrderData
  accessToken: string | undefined
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

export type OrderDetailResponseData = {
  items: OrderData
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type OrderListData = {
  items: OrderData[]
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

export type OrderFullDetailData = {
  order: OrderData
  productList: OrderProductList['items']
  price: OrderPrice
}

export type OrderProductList = {
  items: OrderProductData[]
}

type OrderPrice = {
  actual_price: number
  total: number
}

export type CreateOrderResponseData = {
  id: OrderData['id']
}

export const createOrder = async (data: Omit<CreateOrderData, 'cart_id'>) => {
  const cartId = getCookie('cartId')?.toString()

  if (!cartId) throw new AxiosError('There is no cart available', '404')

  const orderData: CreateOrderData = {
    cart_id: cartId,
    ...data,
  }

  return await http.post<CreateOrderResponseData>('/order', {
    ...orderData,
  })
}

export const getOrderListByUser = async (params?: FilterParams) => {
  let paramAfterJSON
  if (params) {
    paramAfterJSON = fieldJSONParse(params)
  }

  return await http
    .get<OrderListData>('/order', {
      params: { ...paramAfterJSON },
    })
    .then((res) => res.data)
}

export const getOrderDetailById = async (id: OrderData['id']) => {
  return await http.get<OrderDetailResponseData>(`/order/${id}`).then((res) => res.data)
}

export const getOrderProductListById = async (id: OrderData['id']) => {
  return await http.get<OrderProductList>(`/order/${id}/product`).then((res) => res.data)
}

export const getOrderPrice = async (id: OrderData['id']) => {
  return await http.get<OrderPrice>(`/order/${id}/total`).then((res) => res.data)
}

export const getOrderProductWithImageListById = async (id: OrderData['id']) => {
  return await getOrderProductListById(id).then(async (orderProductList) => {
    return await Promise.all(
      orderProductList.items.map(async (orderItem) => {
        return await getProductBaseById(orderItem.product_id)
          .catch((e) => {
            if (e instanceof AxiosError && e.response?.status === BAD_REQUEST_STATUS) {
              return undefined
            }
          })
          .then((product) => {
            if (product) {
              const orderWithImage: OrderProductData = {
                ...orderItem,
                product_image: product.items.images[0],
              }
              return orderWithImage
            } else {
              return orderItem
            }
          })
      }),
    ).then((orderProductWithImageList) => {
      return orderProductWithImageList
    })
  })
}

export const getOrderFullDetailById = async (orderId: OrderData['id']) => {
  return await Promise.all([
    getOrderDetailById(orderId),
    getOrderProductWithImageListById(orderId),
    getOrderPrice(orderId),
  ]).then(([order, productList, price]) => {
    const orderFullDetail: OrderFullDetailData = {
      order: order.items,
      productList: productList,
      price: price,
    }
    return orderFullDetail
  })
}
