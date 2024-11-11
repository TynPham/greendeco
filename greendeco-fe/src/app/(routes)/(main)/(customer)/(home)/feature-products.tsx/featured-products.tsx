import Link from 'next/link'
import { FeaturedProductsContent } from './featured-products-content'
import path from '@/src/constants/path'

export default function FeaturedProducts() {
  return <FeaturedProductsContent />
}

export function ShopAllLink() {
  return (
    <Link
      href={path.products}
      className='text-body-sm text-neutral-gray-1 underline'
    >
      Shop All
    </Link>
  )
}
