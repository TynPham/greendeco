'use client'
import { deleteProduct } from '@/app/_api/axios/admin/product'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useDialogStore } from '../_configs/store/useDialogStore'
import { notifyDeleteProductSuccess } from '../(routes)/(main)/administrator/(main)/product/Notifications'

export default function useDeleteProduct() {
	const { closeDialog } = useDialogStore()
	const router = useRouter()

	const queryClient = useQueryClient()
	const deleteProductMutation = useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Product] })
			closeDialog()
			notifyDeleteProductSuccess()
		},
		onError: () => {
			router.replace('/administrator/login')
		},
	})

	return deleteProductMutation
}
