import { ADMINISTRATOR_ROUTE } from '@/src/configs/constants/variables'
import Link from 'next/link'
import VariantDisplay from './VariantDislay'
import { ADMIN_QUERY_KEY } from '@/src/configs/constants/queryKey'
import { ArchiveBoxXMarkIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import { VariantDetailLoading } from '../loading/VariantLoading'
import { useGetVariantsByProductId } from '@/src/queries/product'
import { ProductData } from '@/src/types/product.type'

export default function ProductVariantInfo({
  productName,
  productId
}: {
  productName: ProductData['name']
  productId: ProductData['id']
}) {
  const { data, isLoading } = useGetVariantsByProductId(productId, ADMIN_QUERY_KEY)
  console.log(data?.data?.items)

  return (
    <>
      {isLoading && <VariantDetailLoading />}
      {data && data.data?.page_size > 0 && (
        <VariantDisplay
          variantList={data.data.items}
          productId={productId}
          productName={productName}
        />
      )}
      {data && data.data?.page_size === 0 && (
        <CreateNewVariantMessage
          productId={productId}
          productName={productName}
        />
      )}
    </>
  )
}

function CreateNewVariantMessage({
  productId,
  productName
}: {
  productId: ProductData['id']
  productName: ProductData['name']
}) {
  return (
    <div className='flex-col-start w-full items-center justify-center gap-cozy p-comfortable'>
      <div className='flex-col-start items-center'>
        <ArchiveBoxXMarkIcon className='aspect-square h-[120px] text-primary-418' />
        <span className='text-body-md'>
          Currently, there is no variant available for this product
        </span>
      </div>
      <Link
        className='btn flex items-center gap-compact'
        href={{
          pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/variant/create`,
          query: {
            productId: productId,
            productName: productName
          }
        }}
      >
        Create A New Variant
        <PlusCircleIcon className='aspect-square h-[24px]' />
      </Link>
    </div>
  )
}
