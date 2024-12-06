'use client'

import ReviewSection from './ProductReviewSection'
import DetailContainer from './ProductDetailContainer'
import ImageGallery from './ProductImageGallery'
import Price from './ProductPrice'
import { useVariantStore } from '@/src/configs/store/useVariantStore'
import ProductDetailLoading from './loading'
import { useGetProductDetailById } from '@/src/queries/product'
import { ProductDetailData } from '@/src/types/product.type'

export default function ProductDetailPage({
  params
}: {
  params: {
    productId: string
  }
}) {
  const { data, isLoading, isSuccess } = useGetProductDetailById(params.productId)

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
        <div className='flex-col-start col-span-2 gap-cozy md:col-span-1'>
          <Price />
          <ReviewSection productId={product.id} />
        </div>
      </div>
    </div>
  )
}
