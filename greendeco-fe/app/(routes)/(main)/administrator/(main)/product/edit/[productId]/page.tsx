'use client'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import { getProductBaseById } from '@/app/_api/axios/product'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import EditFormContainer from './ProductImageProvider'
import { ProductDetailLoading } from '../../loading'

export default function EditProductPage({
	params: { productId },
}: {
	params: {
		productId: string
	}
}) {
	const productQuery = useQuery({
		queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Product, productId],
		queryFn: () => getProductBaseById(productId),
	})

	const { data, isSuccess, isError, isLoading } = productQuery

	return (
		<div className='min-h-screen py-comfortable'>
			<Block>
				{isLoading && <ProductDetailLoading />}
				{isSuccess && data && (
					<>
						<h1>Edit Product</h1>
						<div className='mt-comfortable border-x-[1px] border-x-primary-625-60 px-comfortable'>
							<EditFormContainer {...data.items} />
						</div>
					</>
				)}
			</Block>
		</div>
	)
}
