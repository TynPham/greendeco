'use client'

import DeleteProductDialog from '@/src/app/(routes)/(main)/administrator/(main)/product/DeleteProductDialog'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import { ProductData } from '../../types/product.type'

export default function useConfirmDeleteProductDialog({
  productId
}: {
  productId: ProductData['id']
}) {
  const { openDialog } = useDialogStore()

  const openDeleteProductConfirmDialog = () => {
    openDialog(<DeleteProductDialog productId={productId} />)
  }

  return { openDeleteProductConfirm: openDeleteProductConfirmDialog }
}
