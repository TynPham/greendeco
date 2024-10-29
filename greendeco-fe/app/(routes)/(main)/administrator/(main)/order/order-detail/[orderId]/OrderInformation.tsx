import { OrderFullDetailData } from '@/app/_api/axios/order'

export default function OrderInformationWrapper({ order }: { order: OrderFullDetailData }) {
	return (
		<>
			<div className='flex-col-start sticky top-comfortable h-fit gap-cozy p-cozy shadow-30'>
				<h2 className='text-body-md'>Coupon Infomation:</h2>
				<div className='flex-col-start gap-compact text-body-sm'>
					<div className='flex justify-between'>
						<p>ID:</p>
						<b>{order.order.coupon_id ? order.order.coupon_id : '---'}</b>
					</div>
					<div className='flex justify-between'>
						<p>Discount:</p>
						<b>{order.order.coupon_discount}%</b>
					</div>
				</div>
				<div className='flex items-center justify-between text-body-md '>
					<b className=' font-semi-bold'>Subtotal Price:</b>
					<p>$ {order.price.total}</p>
				</div>
				<div className='flex items-center justify-between border-t-[2px] border-primary-5555 pt-cozy text-body-lg'>
					<b className='text-primary-5555'>Order Actual Price:</b>
					<b>$ {order.price.actual_price}</b>
				</div>
			</div>
		</>
	)
}
