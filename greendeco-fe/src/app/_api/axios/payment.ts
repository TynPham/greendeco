import { OrderData } from './order'
import { http } from '@/src/app/_utils/http'

type VNPayReturnData = {
  callback_url: string
}

type PaypalOrderOnApprove = {
  order_id: string
}

export const createVNPayPayment = async (id: OrderData['id']) => {
  return await http.post<VNPayReturnData>('/payment/vnpay_create', {
    id: id,
    type: 'VNPay'
  })
}

export const createPaypalPayment = async (id: OrderData['id']) => {
  return await http
    .post<PaypalOrderOnApprove>('/payment/paypal_create', {
      id: id,
      type: 'PayPal'
    })
    .then((res) => res.data)
    .then((order) => order.order_id)
}

export const paypalOnApprove = async (data: any) => {
  return await http
    .post('/payment/paypal_return', {
      ID: data.orderID
    })
    .then((res) => res.data)
    .then((message) => window.location.replace(message.url))
}
