'use client'

import PaymentInfoDialog from '@/src/app/(routes)/(main)/(customer)/user/order/[orderId]/PaymentInfoDialog'
import { OrderData } from '@/src/app/_api/axios/order'
import { useDialogStore } from '@/src/app/_configs/store/useDialogStore'

export default function usePaymentInfoDialog() {
  const { openDialog } = useDialogStore()

  const openPaymentInfoDialog = (orderId: OrderData['id']) => {
    openDialog(<PaymentInfoDialog orderId={orderId} />)
  }

  return { openPaymentInfoDialog: openPaymentInfoDialog }
}
