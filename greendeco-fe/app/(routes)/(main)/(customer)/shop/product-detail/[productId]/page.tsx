'use client'

import { useQuery } from '@tanstack/react-query'
import ReviewSection from './ProductReviewSection'
import DetailContainer from './ProductDetailContainer'
import ImageGallery from './ProductImageGallery'
import Price from './ProductPrice'
import { ProductDetailData, getProductDetailById } from '@/app/_api/axios/product'
import { useVariantStore } from '@/app/_configs/store/useVariantStore'
import ProductDetailLoading from './loading'

export default function ProductDetailPage({
	params,
}: {
	params: {
		productId: string
	}
}) {
	const productDetailQuery = useQuery({
		queryKey: ['product', params.productId],
		queryFn: () => getProductDetailById(params.productId),
	})

	const { data, isLoading, isSuccess, isError } = productDetailQuery

	return (
		<>
			{isLoading && <ProductDetailLoading />}
			{isSuccess && <ContentWrapper {...data} />}
		</>
	)
}

function ContentWrapper(props: ProductDetailData) {
	const { product, variants } = props

	const defaultVariant = variants.find((variant) => variant.id === product.default_variant)

	const setActiveVariant = useVariantStore((state) => state.setActiveVariant)

	setActiveVariant(defaultVariant || variants[0])

	return (
		<div className='flex-col-start gap-cozy'>
			<ImageGallery productImages={product.images} />
			<div className='grid grid-cols-2 gap-cozy'>
				<DetailContainer
					product={product}
					variantList={variants}
				/>
				<div className='flex-col-start gap-cozy'>
					<Price />
					<ReviewSection productId={product.id} />
				</div>
			</div>
		</div>
	)
}
