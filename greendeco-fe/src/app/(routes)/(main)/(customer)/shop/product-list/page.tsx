'use client'

import ProductCardsGrid from '@/src/components/product/ProductGrid'
import useQueryParams from '@/src/hooks/useQueryParams'
import { ProductSortMenu } from './ProductSortMenu'
import FilterSideBar from './ProductFilterSideBar'
import ProductListLoading from './loading'
import { FaceFrownIcon } from '@heroicons/react/24/solid'
import ProuductListError from './error'
import ProductListPagination from './ProductListPagination'
import { FilterParams } from '@/src/types'
import { useGetProductList } from '@/src/queries/product'

export default function ProductListPage() {
  const { queryObject } = useQueryParams<FilterParams>()

  const productListQuery = useGetProductList({
    limit: 20,
    ...queryObject
  })

  return (
    <div className='grid grid-cols-1 gap-8 px-4 py-comfortable md:grid-cols-12'>
      <div className='hidden xl:col-span-3 xl:block'>
        <FilterSideBar />
      </div>

      <div className='col-span-12 xl:col-span-9'>
        <div className='flex-col-start gap-cozy'>
          {productListQuery.isError === false && productListQuery.data?.data.page_size !== 0 && (
            <div className='flex w-full items-center justify-end'>
              <ProductSortMenu />
            </div>
          )}

          {productListQuery.isLoading && <ProductListLoading />}

          {productListQuery.isSuccess && (
            <>
              {productListQuery.data.data.page_size > 0 ? (
                <>
                  <ProductCardsGrid productList={productListQuery.data.data.items} />
                  <ProductListPagination
                    next={productListQuery.data.data.next}
                    prev={productListQuery.data.data.prev}
                  />
                </>
              ) : (
                <OutOfProductMessage />
              )}
            </>
          )}
        </div>

        {productListQuery.isError && <ProuductListError />}
      </div>
    </div>
  )
}

function OutOfProductMessage() {
  return (
    <div className='flex h-[150px] w-full items-center justify-center text-primary-418 md:h-[200px]'>
      <span className='flex-col-center gap-compact'>
        <FaceFrownIcon className='aspect-square h-[60px] md:h-[80px]' />
        <p className='px-4 text-center text-body-sm md:text-body-md'>
          Sorry! We can&apos;t find any product
        </p>
      </span>
    </div>
  )
}
