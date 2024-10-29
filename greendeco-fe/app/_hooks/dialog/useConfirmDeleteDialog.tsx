'use client'

import DeleteProductDialog from '@/app/(routes)/(main)/administrator/(main)/product/DeleteProductDialog'
import { ProductData } from '@/app/_api/axios/product'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'

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
