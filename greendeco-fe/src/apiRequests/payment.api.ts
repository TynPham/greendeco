import { OrderData } from '../types/order.type'
import { PaypalOrderOnApprove, VNPayReturnData } from '../types/payment.type'
import { http } from '../utils/http'

const paymentApis = {
  createVNPayPayment: (id: OrderData['id']) => {
    return http.post<VNPayReturnData>('/payment/vnpay_create', {
      id: id,
      type: 'VNPay'
    })
  },
  createPaypalPayment: (id: OrderData['id']) => {
    return http.post<PaypalOrderOnApprove>('/payment/paypal_create', {
      id: id,
      type: 'PayPal'
    })
  },
  paypalOnApprove: (data: any) => {
    return http.post('/payment/paypal_return', {
      ID: data.orderID
    })
  }
}

export default paymentApis
