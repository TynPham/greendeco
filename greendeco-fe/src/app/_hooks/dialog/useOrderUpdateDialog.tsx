'use client'

import { useDialogStore } from '@/src/app/_configs/store/useDialogStore'
import PickUpDateModal from '@/src/app/(routes)/(main)/administrator/(main)/order/PickUpDateModal'
import CancelModal from '@/src/app/(routes)/(main)/administrator/(main)/order/CancelModal'
import { OrderState } from '@/src/app/_api/axios/admin/order'

export default function useOrderUpdateDialog({ order }: { order: OrderState }) {
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
