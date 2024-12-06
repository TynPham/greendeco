'use client'

import PaymentInfoDialog from '@/src/app/(routes)/(main)/(customer)/user/order/[orderId]/PaymentInfoDialog'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import { OrderData } from '../../types/order.type'

export default function usePaymentInfoDialog() {
  const { openDialog } = useDialogStore()

  const openPaymentInfoDialog = (orderId: OrderData['id']) => {
    openDialog(<PaymentInfoDialog orderId={orderId} />)
  }

  return { openPaymentInfoDialog: openPaymentInfoDialog }
}
