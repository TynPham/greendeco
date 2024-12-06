'use client'

import Block from '@/src/components/Block'
import ProductDetail from './ProductDetail'
import ProductVariantInfo from './ProductVariantInfo'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/src/configs/constants/variables'
import { ADMIN_QUERY_KEY } from '@/src/configs/constants/queryKey'
import { ArrowLeftIcon, PencilSquareIcon } from '@heroicons/react/24/solid'
import { ProductDetailLoading } from '../loading'
import { useGetProductBaseById } from '@/src/queries/product'

export default function ProductDetailManagementPage({
  params
}: {
  params: {
    productId: string
  }
}) {
  const { productId } = params

  const { data, isSuccess, isLoading } = useGetProductBaseById(productId, ADMIN_QUERY_KEY)

  return (
    <div className=' min-h-screen  py-comfortable'>
      {isLoading && (
        <Block>
          <ProductDetailLoading />
        </Block>
      )}
      {isSuccess && (
        <div className='flex-col-start min-h-full gap-comfortable '>
          <Block>
            <div className='mb-cozy flex items-center justify-between'>
              <h1>{data.data.items.name}</h1>
              <div className='flex items-center gap-cozy'>
                <Link
                  className='flex items-center gap-[4px] text-body-xsm'
                  href={{
                    pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}`
                  }}
                >
                  <ArrowLeftIcon className='aspect-square h-[16px]' /> Back to product list
                </Link>
                <Link
                  className='btn btnSecondary flex items-center gap-compact'
                  href={{
                    pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/edit/${productId}`
                  }}
                >
                  Edit Product
                  <PencilSquareIcon className='aspect-square h-[24px]' />
                </Link>
              </div>
            </div>
            <ProductDetail product={data.data.items} />
          </Block>

          <Block>
            <ProductVariantInfo
              productName={data.data.items.name}
              productId={data.data.items.id}
            />
          </Block>
        </div>
      )}
    </div>
  )
}
