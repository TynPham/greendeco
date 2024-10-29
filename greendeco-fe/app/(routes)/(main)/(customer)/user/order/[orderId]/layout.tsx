import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Order Detail',
	description:
		'Where you can view your order detail and submit your payment if you have not paid',
}

export default function UserOrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='flex-col-start w-full gap-cozy'>
			<div className='rounded-[4px] bg-neutral-gray-1 p-comfortable shadow-38'>
				{children}
			</div>
		</div>
	)
}
