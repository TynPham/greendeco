// Server Component
import { ProductListData } from '@/src/app/_api/axios/product'
import ProductCarouselWrapper from './product-carousel-wrapper'
import ProductCard from './ProductCard'

export default function ProductCarousel({
  productList,
  breakpoints
}: {
  productList: ProductListData['items']
  breakpoints: Record<number, { slidesPerView: number }>
}) {
  return (
    <ProductCarouselWrapper
      breakpoints={breakpoints}
      navigationButtons={true}
    >
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </ProductCarouselWrapper>
  )
}
