import { OrderState } from '../configs/constants/paramKeys'
import { OrderData } from '../types/order.type'

type NotificationContent = {
  title: string
  message: string
}

export default function createNotificationMessage(
  orderId: OrderData['id'],
  state: OrderState,
  cancelReason?: string
) {
  if (state === 'cancelled') {
    const content: NotificationContent = {
      title: 'Your Order Has Been Cancelled',
      message: `Order ${orderId} has been cancelled with reason: ${cancelReason}`
    }
    return content
  } else {
    const updateMessage =
      state === 'processing'
        ? `We have received your payment for order ${orderId}, we are currently preparing your order`
        : state === 'completed'
          ? `Order ${orderId} has been completed. Make sure to leave your reviews in the Purchased Product section!`
          : ''
    const content: NotificationContent = {
      title: 'Your Order Has Been Updated',
      message: updateMessage
    }
    return content
  }
}
