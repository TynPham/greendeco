import React from 'react'
import Banner from './Banner'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'All Products',
	description: 'All the products of GreenDeco',
}

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='min-h-screen bg-[#ECF4F1]'>
			<Banner />
			<section className='container'>{children}</section>
		</div>
	)
}
