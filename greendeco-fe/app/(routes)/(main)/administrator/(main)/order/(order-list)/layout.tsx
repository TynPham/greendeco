import { Metadata } from 'next'
import { ReactNode } from 'react'
import Block from '@/app/_components/Block'
import OrderStateFilter from '../OrderStateFilter'

export const metadata: Metadata = {
	title: 'Order Management',
	description: 'Where admin can view list of orders',
}

export default function OrderListPageLayout({ children }: { children: ReactNode }) {
	return (
		<div className='w-full py-comfortable'>
			<Block>
				<div>
					<h1 className='font-semi-bold text-primary-418'>Manage Order</h1>
					<div className='mt-cozy flex items-center justify-between'>
						<OrderStateFilter />
					</div>
					{children}
				</div>
			</Block>
		</div>
	)
}
