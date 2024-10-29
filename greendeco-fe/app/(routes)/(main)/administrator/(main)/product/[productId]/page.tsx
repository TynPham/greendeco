'use client'

import { getProductBaseById } from '@/app/_api/axios/product'
import Block from '@/app/_components/Block'
import { useQuery } from '@tanstack/react-query'
import ProductDetail from './ProductDetail'
import ProductVariantInfo from './ProductVariantInfo'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { ProductDetailLoading } from '../loading'

export default function ProductDetailManagementPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	const { productId } = params

	const productQuery = useQuery({
		queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Product, productId],
		queryFn: () => getProductBaseById(productId),
	})

	const { data, isSuccess, isLoading } = productQuery

	return (
		<div className=' min-h-screen  py-comfortable'>
			{isLoading && (
				<Block>
					<ProductDetailLoading />
				</Block>
			)}
			{isSuccess && (
				<div className='flex-col-start min-h-full gap-comfortable '>
					<Block>
						<div className='mb-cozy flex items-center justify-between'>
							<h1>{data.items.name}</h1>
							<div className='flex items-center gap-cozy'>
								<Link
									className='flex items-center gap-[4px] text-body-xsm'
									href={{
										pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}`,
									}}
								>
									<ArrowLeftIcon className='aspect-square h-[16px]' /> Back to
									product list
								</Link>
								<Link
									className='btn btnSecondary flex items-center gap-compact'
									href={{
										pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/edit/${productId}`,
									}}
								>
									Edit Product
									<PencilSquareIcon className='aspect-square h-[24px]' />
								</Link>
							</div>
						</div>
						<ProductDetail product={data.items} />
					</Block>

					<Block>
						<ProductVariantInfo
							productName={data.items.name}
							productId={data.items.id}
						/>
					</Block>
				</div>
			)}
		</div>
	)
}
