import React from 'react'
import type { Metadata } from 'next'
import Block from '@/app/_components/Block'

export const metadata: Metadata = {
	title: 'Order Detail',
	description: 'Where admin can view list of orders',
}

export default function OrderAdminDetailLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-full py-comfortable'>
			<Block>{children}</Block>
		</div>
	)
}
