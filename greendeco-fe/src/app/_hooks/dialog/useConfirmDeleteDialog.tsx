'use client'

import DeleteProductDialog from '@/src/app/(routes)/(main)/administrator/(main)/product/DeleteProductDialog'
import { ProductData } from '@/src/app/_api/axios/product'
import { useDialogStore } from '@/src/app/_configs/store/useDialogStore'

export default function useConfirmDeleteProductDialog({
  productId,
}: {
  productId: ProductData['id']
}) {
  const { openDialog } = useDialogStore()

  const openDeleteProductConfirmDialog = () => {
    openDialog(<DeleteProductDialog productId={productId} />)
  }

  return { openDeleteProductConfirm: openDeleteProductConfirmDialog }
}
