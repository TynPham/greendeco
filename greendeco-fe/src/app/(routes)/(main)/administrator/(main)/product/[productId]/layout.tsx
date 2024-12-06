import React from 'react'
import { Metadata } from 'next'
import productApis from '@/src/apiRequests/product.api'

export const generateMetadata = async (props: {
  params: { productId: string }
}): Promise<Metadata> => {
  const { params } = props
  const productName = await productApis
    .getProductBaseById(params.productId)
    .then((res) => res.data.items.name)
  return {
    title: `${productName} Detail `
  }
}
export default function ProductDetailLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
