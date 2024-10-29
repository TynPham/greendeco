import { OrderData, OrderFullDetailData } from '@/app/_api/axios/order'
import { VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import { ReceiptPercentIcon } from '@heroicons/react/24/outline'

export default function OrderPrice({
	coupon_id,
	coupon_discount,
	price,
}: {
	coupon_id: OrderData['coupon_id']
	coupon_discount: OrderData['coupon_discount']
	price: OrderFullDetailData['price']
}) {
	return (
		<div className='flex-col-start gap-compact p-cozy '>
			<div className='grid grid-cols-10 gap-cozy text-body-sm'>
				<div className='col-span-8 flex items-center gap-cozy'>
					<span>
						<span className='font-semi-bold'>Coupon Code:</span>{' '}
						{coupon_id ? coupon_id : '--'}
					</span>
					<span>
						<span className='inline-flex items-center gap-[4px] font-semi-bold'>
							Discount <ReceiptPercentIcon className='aspect-square h-[16px]' />
						</span>
						: {coupon_discount}%
					</span>
				</div>
				<div className='col-span-2 flex items-center justify-center font-semi-bold'>
					{price.total} {VARIANT_CURRENCY}
				</div>
			</div>
			<div className='mt-compact grid grid-cols-10 text-body-lg'>
				<div className='col-span-2 col-start-9 flex items-center justify-center rounded-[16px] border-[3px] border-primary-625  py-compact font-bold text-primary-625  shadow-38'>
					Total: {price.total} {VARIANT_CURRENCY}
				</div>
			</div>
		</div>
	)
}
