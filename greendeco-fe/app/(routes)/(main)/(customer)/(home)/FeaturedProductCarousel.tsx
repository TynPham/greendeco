import { getProductList } from '@/app/_api/axios/product'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import ProductCarousel from '@/app/_components/product/ProductCarousel'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { FEATURE_PRODUCT_PARAMS } from '@/app/_configs/constants/variables'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'

export default function FeaturedProductCarousel({ type }: { type: 'new' | 'topRated' | 'cheap' }) {
	const featureProductParams = useMemo(() => FEATURE_PRODUCT_PARAMS, [])

	const params = featureProductParams[type]

	const featureProductQuery = useQuery({
		queryKey: [UseQueryKeys.Product, type],
		queryFn: () =>
			getProductList({
				limit: 10,
				...params,
			}),
	})

	const { data, isLoading, isSuccess } = featureProductQuery

	return (
		<>
			{isLoading && <Loading />}
			{data && isSuccess && <ProductCarousel productList={data.items} />}
		</>
	)
}

function Loading() {
	return (
		<div className='grid gap-cozy md:grid-cols-4 lg:grid-cols-5'>
			<SkeletonTheme
				baseColor='#e4e8e3'
				highlightColor='#f7f8f7'
				duration={2}
				borderRadius={4}
			>
				<span className='flex-col-start h-full gap-compact opacity-20'>
					<Skeleton className=' h-[240px] flex-1' />
					<p>
						<Skeleton />
					</p>
				</span>
				<span className='flex-col-start h-full gap-compact opacity-20'>
					<Skeleton className=' h-[240px] flex-1' />
					<p>
						<Skeleton />
					</p>
				</span>
				<span className='flex-col-start h-full gap-compact opacity-20'>
					<Skeleton className=' h-[240px] flex-1' />
					<p>
						<Skeleton />
					</p>
				</span>
			</SkeletonTheme>
		</div>
	)
}
