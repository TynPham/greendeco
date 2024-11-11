'use client'
import ProductCarousel from '@/src/app/_components/product/ProductCarousel'
import { useGetProductList } from '@/src/queries/product'
import { ProductSize } from '@/src/app/_types/product.type'
import ProductSizeFallback from './product-size-fallback'

const BREAKPOINTS = {
  1024: { slidesPerView: 2 },
  1280: { slidesPerView: 3 },
} as const

export function ProductCarouselContainer({ size }: { size: ProductSize }) {
  const { data, isLoading, isSuccess } = useGetProductList({
    field: JSON.stringify({ size }),
    limit: 10,
  })

  if (isLoading) return <ProductSizeFallback />
  if (!data || !isSuccess) return null

  return (
    <ProductCarousel
      productList={data.data.items}
      breakpoints={BREAKPOINTS}
    />
  )
}
