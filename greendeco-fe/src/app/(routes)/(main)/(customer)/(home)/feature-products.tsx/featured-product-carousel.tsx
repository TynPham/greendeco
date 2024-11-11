'use client'

import ProductCarousel from '@/src/app/_components/product/ProductCarousel'
import { FEATURE_PRODUCT_PARAMS } from '@/src/app/_configs/constants/variables'
import { useMemo } from 'react'
import { useGetProductList } from '@/src/queries/product'
import ProductFallback from './product-fallback'

const BREAKPOINTS = {
  640: { slidesPerView: 1 },
  768: { slidesPerView: 2 },
  1024: { slidesPerView: 3 },
  1280: { slidesPerView: 5 },
} as const

export default function FeaturedProductCarousel({ type }: { type: 'new' | 'topRated' | 'cheap' }) {
  const featureProductParams = useMemo(() => FEATURE_PRODUCT_PARAMS, [])

  const params = featureProductParams[type]

  const featureProductQuery = useGetProductList({
    limit: 10,
    ...params,
  })

  const { data, isLoading, isSuccess } = featureProductQuery

  return (
    <>
      {isLoading && <ProductFallback />}
      {data && isSuccess && (
        <ProductCarousel
          productList={data.data.items}
          breakpoints={BREAKPOINTS}
        />
      )}
    </>
  )
}
