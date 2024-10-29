import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'GreenDeco Admin Login',
	description: 'GreenDeco Administration Login',
}

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='h-screen max-h-screen w-screen  bg-adminLogin bg-cover bg-no-repeat'>
			<section className='container flex h-full items-center justify-center'>
				{children}
			</section>
		</div>
	)
}
