'use client'

import CartDialog from '@/src/components/cart'
import { useDialogStore } from '@/src/configs/store/useDialogStore'

export default function useCartDialog() {
  const { openDialog } = useDialogStore()

  const openCart = () => {
    openDialog(<CartDialog />)
  }

  return { openCart: openCart }
}
