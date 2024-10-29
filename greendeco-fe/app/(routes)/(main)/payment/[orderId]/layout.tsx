import React from 'react'
import type { Metadata } from 'next'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'

export const metadata: Metadata = {
	title: 'Order Success!',
	description: 'Your order has been placed! Time for payment',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='h-screen max-h-screen w-screen  '>
			<div className='flex-col-start h-full w-full items-center '>
				<div className='flex-col-start w-full gap-compact  border-b-[1px] border-primary-625 bg-status-success py-[40px]'>
					<div className='flex-col-start container items-center gap-cozy text-neutral-gray-1'>
						<CheckBadgeIcon className='aspect-square h-[80px]' />
						<h1 className=' text-heading capitalize '>Order Successfully Placed!</h1>
					</div>
				</div>
				<div className='h-full w-full bg-neutral-gray-1 py-[40px]'>{children}</div>
			</div>
		</main>
	)
}
