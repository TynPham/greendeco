import React from 'react'
import { ToastContentProps, toast, ToastOptions } from 'react-toastify'
import Link from 'next/link'
import { ProductData } from '@/app/_api/axios/product'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'

export const notifyCreateProductSuccess = (productId: string, options?: ToastOptions) => {
	toast.success(<CreateProductSuccessMessage productId={productId} />, {
		position: 'top-center',
		onClose: options?.onClose,
	})
}
export const notifyUpdateProductSuccess = () => {
	toast.success(<UpdateProductSuccessMessage />, {
		position: 'top-center',
	})
}

export const notifyDeleteProductSuccess = () => {
	toast.success(<DeleteProductSuccessMessage />, {
		position: 'top-center',
	})
}

export const notifyCreateVariantSuccess = () => {
	toast.success(<CreateVariantSuccessMessage />, {
		position: 'top-center',
	})
}

export const notifyUpdateVariantSuccess = () => {
	toast.success(<UpdateVariantSuccessMessage />, {
		position: 'top-center',
	})
}
const CreateProductSuccessMessage = ({ productId }: { productId: ProductData['id'] }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Product Has Been Created</h3>
		<p>
			Redirecting to the{' '}
			<Link
				href={`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${productId}`}
				className='hover:font-bold'
			>
				Product Detail
			</Link>
		</p>
	</div>
)

const UpdateProductSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Successfully Updated Product</h3>
	</div>
)

const DeleteProductSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Product Has Been Deleted</h3>
	</div>
)

const CreateVariantSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Successfully Created Variant</h3>
	</div>
)

const UpdateVariantSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Successfully Updated Variant</h3>
	</div>
)
