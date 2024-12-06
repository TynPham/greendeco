'use client'

import { useDialogStore } from '@/src/configs/store/useDialogStore'
import PickUpDateModal from '@/src/app/(routes)/(main)/administrator/(main)/order/PickUpDateModal'
import CancelModal from '@/src/app/(routes)/(main)/administrator/(main)/order/CancelModal'
import { OrderStateTable } from '../../types/order.type'

export default function useOrderUpdateDialog({ order }: { order: OrderStateTable }) {
  const { openDialog } = useDialogStore()

  const openOrderUpdateDialog = (dialogType: 'processing' | 'cancel') => {
    switch (dialogType) {
      case 'processing':
        openDialog(<PickUpDateModal order={order} />)
        break
      case 'cancel':
        openDialog(<CancelModal order={order} />)
        break
    }
  }

  return { openOrderUpdateDialog: openOrderUpdateDialog }
}
