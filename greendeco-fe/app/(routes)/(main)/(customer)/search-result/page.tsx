'use client'
import { FieldParams, FilterParams, getProductListWithSearch } from '@/app/_api/axios/product'
import ProductCardsGrid from '@/app/_components/product/ProductGrid'
import { useQuery } from '@tanstack/react-query'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { ProductSortMenu } from './ProductSortMenu'
import ProductListLoading from './loading'
import { FaceFrownIcon } from '@heroicons/react/24/solid'
import ProuductListError from './error'
import ProductListPagination from './ProductListPagination'

export default function ProductListPage() {
	const { queryObject } = useQueryParams<FilterParams>()
	const queryObj: FilterParams = { ...queryObject }

	const field: FieldParams = queryObj.field ? JSON.parse(queryObj.field) : null
	const searchParam = field?.name ? field.name : ''

	const productListQuery = useQuery({
		queryKey: ['product', queryObject],
		queryFn: () =>
			getProductListWithSearch({
				limit: 20,
				...queryObject,
			}),
		refetchOnWindowFocus: false,
	})

	const { data, isError, isLoading, isSuccess } = productListQuery

	return (
		<div className='flex-col-start gap-cozy py-comfortable'>
			{/*NOTE: Because isError default false => doesn't cause rerender the SortMenu  */}
			{isError === false && data?.page_size !== 0 && (
				<div className='flex w-full items-center justify-between'>
					<span className='text-body-sm text-primary-418-60'>
						{data && data?.page_size > 1 ? (
							<>
								There are {data?.page_size} results that are close to{' '}
								<span className='font-semi-bold'>&quot;{searchParam}&quot;</span>
							</>
						) : (
							<>
								There is {data?.page_size} result that is close to{' '}
								<span className='font-semi-bold'>&quot;{searchParam}&quot;</span>
							</>
						)}
					</span>
					<ProductSortMenu />
				</div>
			)}

			{isLoading && <ProductListLoading />}

			{isSuccess && (
				<>
					{data.page_size > 0 ? (
						<>
							<ProductCardsGrid
								productList={data.items}
								columns={5}
								gap='cozy'
							/>
							<ProductListPagination
								next={data.next}
								prev={data.prev}
							/>
						</>
					) : (
						<OutOfProductMessage searchResult={searchParam} />
					)}
				</>
			)}
			{isError && <ProuductListError />}
		</div>
	)
}

function OutOfProductMessage({ searchResult }: { searchResult: string }) {
	return (
		<div className='flex h-[200px] w-full items-center justify-center text-primary-418'>
			<span className='flex-col-center gap-compact'>
				<FaceFrownIcon className='aspect-square h-[80px]' />

				<p className='text-body-md'>
					Sorry! We can&apos;t find any product that matches{' '}
					<span className='font-semi-bold'>&quot;{searchResult}&quot;</span>
				</p>
			</span>
		</div>
	)
}
