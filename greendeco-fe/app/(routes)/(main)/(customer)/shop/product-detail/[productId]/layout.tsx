import React from 'react'
import { Metadata } from 'next'
import { getProductDetailById } from '@/app/_api/axios/product'

export const generateMetadata = async (props: {
	params: { productId: string }
}): Promise<Metadata> => {
	const { params } = props
	const productName = await getProductDetailById(params.productId).then((res) => res.product.name)
	return {
		title: productName,
	}
}
export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='w-screen bg-light-green pt-away-from-header'>
			<div className='container'>{children}</div>
		</div>
	)
}
