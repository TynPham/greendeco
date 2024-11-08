import {
  OrderData,
  OrderDetailResponseData,
  OrderFullDetailData,
  OrderListData,
  OrderProductList,
  getOrderDetailById,
  getOrderPrice,
  getOrderProductWithImageListById,
} from '../order'
import { FilterParams, fieldJSONParse } from '../product'
import { OrderState as StateOfOrder } from '@/src/app/_configs/constants/paramKeys'
import { createNotification, sendNotification } from './notification'
import { http } from '@/src/app/_utils/http'

type AdminAccessTokenType = string | undefined

export type OrderTableData = {
  OrderData: OrderData
  owner_info: OrderInfo
  order_state: OrderState
  OrderPrice: OrderTotalData
}

export type OrderInfo = {
  order_id: string
  user_name: string
  userPhoneNumber: string
}

export type OrderState = {
  order_id: string
  state: string
  owner_id: string
}

export type OrderTotalData = {
  total: string
  actual_price: string
}

export const getOrderListAsAdministrator = async (params?: FilterParams) => {
  let paramAfterJSON
  if (params) {
    paramAfterJSON = fieldJSONParse(params)
  }
  return await http
    .get<OrderListData>('/order/all/', {
      params: { ...paramAfterJSON },
    })
    .then((res) => res.data)
}

export const getOrderTotalAsAdministrator = async (id: string) => {
  return await http.get<OrderTotalData>(`/order/${id}/total`).then((res) => res.data)
}

// getOrderListTable use to get order table data
export const getOrderListTable = async (params?: FilterParams) => {
  const orders = await getOrderListAsAdministrator(params)
  return await Promise.all(
    orders.items.map(async (order) => {
      const price = await getOrderTotalAsAdministrator(order.id)
      var row: OrderTableData = {
        owner_info: {
          order_id: order.id,
          user_name: order.user_name,
          userPhoneNumber: order.user_phone_number,
        },
        order_state: {
          order_id: order.id,
          state: order.state,
          owner_id: order.owner_id,
        },
        OrderPrice: { ...price },
        OrderData: {
          ...order,
        },
      }
      return row
    }),
  )
}

export const getOrderByIdAsAdminstrator = async (orderId?: string) => {
  return await http.get<OrderDetailResponseData>(`/order/${orderId}`).then((res) => res.data)
}

export const getOrderProductByOrderAsAdminstrator = async (orderId: string) => {
  return await http.get<OrderProductList>(`/order/${orderId}/product/`).then((res) => res.data)
}

export type OrderStatusRequest = {
  adminAccessToken: AdminAccessTokenType
  orderId: string
  state: string
  description?: string
}

export const updateOrderStatus = async ({ orderId, state, description }: OrderStatusRequest) => {
  return await http
    .put(`/order/${orderId}`, {
      state: state,
      description: description,
    })
    .then((res) => res.data)
}

export type ProcessStatusRequest = {
  adminAccessToken: AdminAccessTokenType
  orderId: string
  paid_at: string
  title: string
  message: string
  userId: string
  state: StateOfOrder
}

// updateProcessStatus only use for only update process order status
export const updateOrderProcessStatus = async ({
  orderId,
  paid_at,
  title,
  message,
  userId,
}: ProcessStatusRequest) => {
  await http.put(`/order/${orderId}`, {
    paid_at: paid_at,
    state: StateOfOrder.Processing,
  })

  const newNoti = await createNotification(title, message, orderId)
  return await sendNotification(newNoti.id, [userId])
}

export type StatusRequest = {
  adminAccessToken: AdminAccessTokenType
  orderId: string
  title: string
  message: string
  userId: string
  state: StateOfOrder
}

export const updateOrderStatusSendNoti = async ({
  adminAccessToken,
  orderId,
  title,
  message,
  userId,
  state,
}: StatusRequest) => {
  const orderStatusRequest: OrderStatusRequest = {
    orderId: orderId,
    adminAccessToken: adminAccessToken,
    state: state,
    description: message,
  }
  await updateOrderStatus(orderStatusRequest)
  const newNoti = await createNotification(title, message, orderId)
  return await sendNotification(newNoti.id, [userId])
}

export const getOrderFullDetailAsAdministratorById = async (orderId: OrderData['id']) => {
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
