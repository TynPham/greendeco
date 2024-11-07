import { getProductList } from '@/src/app/_api/axios/product'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { UseQueryKeys } from '@/src/app/_configs/constants/queryKey'
import { useQuery } from '@tanstack/react-query'
import Product from '@/src/app/_components/product/Product'

export default function ProductGridBySize({ size }: { size: 'S' | 'M' | 'L' | 'XL' }) {
  const featureProductQuery = useQuery({
    queryKey: [UseQueryKeys.Product, size],
    queryFn: () =>
      getProductList({
        limit: 10,
        field: JSON.stringify({
          size: size,
        }),
      }),
  })

  const { data, isLoading, isSuccess } = featureProductQuery

  return (
    <>
      {isLoading && <Loading />}
      {data && isSuccess && <Product productList={data.items} />}
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
