import React from 'react'
import { Metadata } from 'next'
import { getProductBaseById } from '@/app/_api/axios/product'

export const generateMetadata = async (props: {
	params: { productId: string }
}): Promise<Metadata> => {
	const { params } = props
	const productName = await getProductBaseById(params.productId).then((res) => res.items.name)
	return {
		title: `${productName} Detail `,
	}
}
export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
