import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Checkout',
	description: 'Proceed to checkout! Thanks for chosing us',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className='h-screen max-h-screen w-screen  bg-primary-418-20/20'>
			<div className='container '>{children}</div>
		</main>
	)
}
