'use client'

import { ProductData } from '@/app/_api/axios/product'
import useDeleteProduct from '@/app/_hooks/useDeleteProduct'
import Button from '@/app/_components/Button'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import useClickOutside from '@/app/_hooks/useClickOutside'
import { useRef } from 'react'

export default function DeleteProductDialog({ productId }: { productId: ProductData['id'] }) {
	const { closeDialog } = useDialogStore()
	const { mutate, isLoading, isSuccess } = useDeleteProduct()
	const deleteProductDialogRef = useRef<any>()

	useClickOutside(deleteProductDialogRef, () => {
		closeDialog()
	})

	const handleDeleteProduct = () => {
		const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
		mutate({
			productId: productId,
			adminAccessToken: adminAccessToken,
		})
	}

	return (
		<div className='container sticky top-0 flex h-full max-h-screen items-center justify-center p-comfortable'>
			<div
				ref={deleteProductDialogRef}
				className=' h-fit bg-white p-comfortable'
			>
				<div className='flex gap-cozy'>
					<ExclamationTriangleIcon className='aspect-square h-[80px] text-status-error/80' />
					<div className='flex-col-start gap-[4px]'>
						<h4 className='text-heading-2'>Delete Product Confirmation</h4>
						<p className=' text-body-md'>
							Proceed to delete this product? This action can&apos;t be undone
						</p>
					</div>
				</div>
				<div className='flex justify-end gap-cozy'>
					<Button
						className='btnSecondary border-status-error/80 text-status-error/80'
						onClick={closeDialog}
					>
						Cancel
					</Button>
					<Button
						className='border-status-error/80 bg-status-error/80'
						onClick={handleDeleteProduct}
						disabled={isLoading}
					>
						{isLoading ? 'Deleting...' : 'Delete'}
					</Button>
				</div>
			</div>
		</div>
	)
}
