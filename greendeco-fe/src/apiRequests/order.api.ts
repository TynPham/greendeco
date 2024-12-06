import { getCookie } from 'cookies-next'

import {
  CreateOrderData,
  CreateOrderResponseData,
  OrderData,
  OrderDetailResponseData,
  OrderFullDetailData,
  OrderListData,
  OrderPrice,
  OrderProductData,
  OrderProductList,
  OrderStatusRequest,
  OrderTableData,
  ProcessStatusRequest,
  StatusRequest
} from '../types/order.type'
import { AxiosError } from 'axios'
import { http } from '../utils/http'
import { FilterParams } from '../types'
import productApis, { fieldJSONParse } from './product.api'
import { ADMIN_QUERY_KEY } from '../configs/constants/queryKey'
import { OrderState as StateOfOrder } from '@/src/configs/constants/paramKeys'
import notificationApis from './notification.api'

const orderApis = {
  createOrder: (data: Omit<CreateOrderData, 'cart_id'>) => {
    const cartId = getCookie('cartId')
    if (!cartId) throw new AxiosError('There is no cart available', '404')

    const orderData: CreateOrderData = {
      cart_id: cartId,
      ...data
    }

    return http.post<CreateOrderResponseData>('/order', {
      ...orderData
    })
  },

  getOrderList: (params?: FilterParams, role: 'user' | 'admin' = 'user') => {
    let paramAfterJSON
    if (params) {
      paramAfterJSON = fieldJSONParse(params)
    }

    const pathname = role === 'user' ? '/order' : '/order/all'

    return http.get<OrderListData>(pathname, {
      params: { ...paramAfterJSON }
    })
  },

  getOrderDetailById: (id: OrderData['id']) => {
    return http.get<OrderDetailResponseData>(`/order/${id}`)
  },

  getOrderProductListById: (id: OrderData['id']) => {
    return http.get<OrderProductList>(`/order/${id}/product`)
  },

  getOrderPrice: (id: OrderData['id']) => {
    return http.get<OrderPrice>(`/order/${id}/total`)
  },

  updateOrderStatus: (data: OrderStatusRequest) => {
    return http.put(`/order/${data.orderId}`, {
      state: data.state,
      description: data.description
    })
  }
}

export const updateOrderProcessStatus = async ({
  orderId,
  paid_at,
  title,
  message,
  userId
}: ProcessStatusRequest) => {
  await http.put(`/order/${orderId}`, {
    paid_at: paid_at,
    state: StateOfOrder.Processing
  })

  const newNoti = await notificationApis.createNotification({
    title,
    message,
    description: orderId
  })
  return await notificationApis.sendNotification({
    notificationId: newNoti.data.id,
    userList: [userId]
  })
}

export const updateOrderStatusSendNoti = async ({
  orderId,
  title,
  message,
  userId,
  state
}: StatusRequest) => {
  const orderStatusRequest: OrderStatusRequest = {
    orderId: orderId,
    state: state,
    description: message
  }
  await orderApis.updateOrderStatus(orderStatusRequest)
  const newNoti = await notificationApis.createNotification({
    title,
    message,
    description: orderId
  })
  return await notificationApis.sendNotification({
    notificationId: newNoti.data.id,
    userList: [userId]
  })
}

export const getOrderProductWithImageListById = async (id: OrderData['id']) => {
  return await orderApis.getOrderProductListById(id).then(async (orderProductList) => {
    return await Promise.all(
      orderProductList.data.items.map(async (orderItem) => {
        return await productApis.getProductBaseById(orderItem.product_id).then((product) => {
          if (product) {
            const orderWithImage: OrderProductData = {
              ...orderItem,
              product_image: product.data.items.images[0]
            }
            return orderWithImage
          } else {
            return orderItem
          }
        })
      })
    ).then((orderProductWithImageList) => {
      return orderProductWithImageList
    })
  })
}

export const getOrderFullDetailById = async (orderId: OrderData['id']) => {
  return await Promise.all([
    orderApis.getOrderDetailById(orderId),
    getOrderProductWithImageListById(orderId),
    orderApis.getOrderPrice(orderId)
  ]).then(([order, productList, price]) => {
    const orderFullDetail: OrderFullDetailData = {
      order: order.data.items,
      productList: productList,
      price: price.data
    }
    return orderFullDetail
  })
}

export const getOrderListTable = async (params?: FilterParams) => {
  const orders = await orderApis.getOrderList({ ...params }, ADMIN_QUERY_KEY)
  return await Promise.all(
    orders.data.items.map(async (order) => {
      const price = await orderApis.getOrderPrice(order.id)
      var row: OrderTableData = {
        owner_info: {
          order_id: order.id,
          user_name: order.user_name,
          userPhoneNumber: order.user_phone_number
        },
        order_state: {
          order_id: order.id,
          state: order.state,
          owner_id: order.owner_id
        },
        OrderPrice: { ...price.data },
        OrderData: {
          ...order
        }
      }
      return row
    })
  )
}

export default orderApis
