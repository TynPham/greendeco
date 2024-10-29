import { OrderData } from '@/app/_api/axios/order'
import React from 'react'
import { ToastOptions, toast } from 'react-toastify'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'

export const notifyUpdateCancelSuccess = (
	orderId: string,
	orderState: string,
	options?: ToastOptions,
) => {
	toast.success(
		<UpdateOrderStateSuccessMessage
			orderId={orderId}
			state={orderState}
		/>,
		{
			position: 'top-center',
		},
	)
}

const UpdateOrderStateSuccessMessage = ({
	orderId,
	state,
}: {
	orderId: OrderData['id']
	state: string
}) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Order Has Been {state}</h3>
		<p>
			<Link
				href={`${ADMINISTRATOR_ROUTE.ORDER_DETAIL.LINK}/${orderId}`}
				className='hover:font-bold'
			>
				View Order Detail
			</Link>
		</p>
	</div>
)
