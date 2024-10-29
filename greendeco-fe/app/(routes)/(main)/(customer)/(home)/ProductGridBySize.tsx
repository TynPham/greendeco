import { getProductList } from '@/app/_api/axios/product'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import ProductCarousel from '@/app/_components/product/ProductCarousel'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useQuery } from '@tanstack/react-query'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'

export default function ProductGridBySize({ size }: { size: 'S' | 'M' | 'L' | 'XL' }) {
	const featureProductQuery = useQuery({
		queryKey: [UseQueryKeys.Product, size],
		queryFn: () =>
			getProductList({
				limit: 6,
				field: JSON.stringify({
					size: size,
				}),
			}),
	})

	const { data, isLoading, isSuccess } = featureProductQuery

	return (
		<>
			{isLoading && <Loading />}
			{data && isSuccess && (
				<div className='w-[80%]'>
					<ProductCardsGrid
						columns={3}
						productList={data.items}
						gap='compact'
					/>
				</div>
			)}
		</>
	)
}

function Loading() {
	return (
		<div className='grid w-full grid-cols-3 gap-cozy'>
			<SkeletonTheme
				baseColor='#99BCAA'
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
