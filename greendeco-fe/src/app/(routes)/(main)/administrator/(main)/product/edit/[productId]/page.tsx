'use client'
import Block from '@/src/components/Block'
import { ADMIN_QUERY_KEY } from '@/src/configs/constants/queryKey'
import EditFormContainer from './ProductImageProvider'
import { ProductDetailLoading } from '../../loading'
import { useGetProductBaseById } from '@/src/queries/product'

export default function EditProductPage({
  params: { productId }
}: {
  params: {
    productId: string
  }
}) {
  const { data, isSuccess, isLoading } = useGetProductBaseById(productId, ADMIN_QUERY_KEY)

  return (
    <div className='min-h-screen py-comfortable'>
      <Block>
        {isLoading && <ProductDetailLoading />}
        {isSuccess && data && (
          <>
            <h1>Edit Product</h1>
            <div className='mt-comfortable border-x border-x-primary-625-60 px-comfortable'>
              <EditFormContainer {...data.data.items} />
            </div>
          </>
        )}
      </Block>
    </div>
  )
}
