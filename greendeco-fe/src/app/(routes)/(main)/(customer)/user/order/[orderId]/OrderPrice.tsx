import { OrderData, OrderFullDetailData } from '@/src/app/_api/axios/order'
import { VARIANT_CURRENCY } from '@/src/app/_configs/constants/variables'
import { ReceiptPercentIcon } from '@heroicons/react/24/outline'

export default function OrderPrice({
  coupon_id,
  coupon_discount,
  price
}: {
  coupon_id: OrderData['coupon_id']
  coupon_discount: OrderData['coupon_discount']
  price: OrderFullDetailData['price']
}) {
  return (
    <div className='flex-col-start gap-compact p-cozy '>
      <div className='grid grid-cols-10 gap-cozy text-body-sm'>
        <div className='col-span-8 flex flex-col gap-cozy sm:flex-row sm:items-center'>
          <span>
            <span className='font-semi-bold'>Coupon Code:</span> {coupon_id ? coupon_id : '--'}
          </span>
          <span>
            <span className='inline-flex items-center gap-[4px] font-semi-bold'>
              Discount <ReceiptPercentIcon className='aspect-square h-[16px]' />
            </span>
            : {coupon_discount}%
          </span>
        </div>
        <div className='col-span-2 flex items-center justify-end text-nowrap font-semi-bold'>
          {price.total} {VARIANT_CURRENCY}
        </div>
      </div>
      <div className='ml-auto mt-compact flex w-max items-center justify-center text-nowrap rounded-[16px] border-[3px] border-primary-625  p-4 text-2xl font-bold text-primary-625 shadow-38 lg:p-6 lg:text-3xl xl:p-8 xl:text-4xl'>
        Total: {price.total} {VARIANT_CURRENCY}
      </div>
    </div>
  )
}
