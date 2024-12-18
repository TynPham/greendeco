import Image from 'next/image'
import { VARIANT_CURRENCY } from '@/src/configs/constants/variables'
import { NOT_FOUND_IMAGE } from '@/src/configs/constants/images'
import { OrderFullDetailData, OrderProductData } from '@/src/types/order.type'

export default function OrderProductList({
  productList
}: {
  productList: OrderFullDetailData['productList']
}) {
  return (
    <>
      <h2 className='py-cozy text-body-lg font-semi-bold'>Product(s)</h2>
      <ul className='flex-col-start divide-y divide-primary-625-40 border-y-2 border-primary-625 p-cozy'>
        {productList.map((product) => (
          <li
            key={product.id}
            className='py-compact first:pt-0 last:pb-0'
          >
            <OrderProductItem product={product} />
          </li>
        ))}
      </ul>
    </>
  )
}

function OrderProductItem({ product }: { product: OrderProductData }) {
  const { variant_name, product_image, variant_price, quantity } = product
  return (
    <div className='grid grid-cols-10 gap-cozy'>
      <div className='col-span-10 flex items-center gap-comfortable text-body-md font-semi-bold text-primary-625 sm:col-span-6'>
        <div className='relative aspect-square h-[60px] overflow-hidden rounded-[8px]'>
          <Image
            src={product_image ? product_image : NOT_FOUND_IMAGE}
            alt={variant_name}
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        {variant_name}
      </div>
      <div className='col-span-10 flex items-center justify-between gap-4 sm:col-span-4 sm:justify-end'>
        <span className='flex items-center  justify-center '>
          <span className='w-full rounded-[4px] border border-primary-625 px-cozy py-compact text-center text-body-sm text-neutral-gray-10'>
            {`${quantity} x ${variant_price} ${VARIANT_CURRENCY}`}
          </span>
        </span>
        <span className=' flex items-center justify-center text-body-sm font-bold text-primary-418'>
          {`${quantity * parseInt(variant_price)} ${VARIANT_CURRENCY}`}
        </span>
      </div>
    </div>
  )
}
