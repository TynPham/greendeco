import Image from 'next/image'
import { ProductData } from '@/src/app/_api/axios/product'
import Link from 'next/link'
import path from '@/src/constants/path'

export type ProductCardProps = Pick<ProductData, 'id' | 'name' | 'images' | 'price'>

// Convert to Server Component
export default function ProductCard({ product }: { product: ProductCardProps }) {
  const { id, name, images, price } = product

  return (
    <Link
      href={`${path.productDetail}/${id}`}
      className='group block w-full overflow-hidden rounded-[8px] bg-white'
    >
      <CardImage imageUrl={images[0]} />
      <div className='flex w-full p-cozy'>
        <CardDetail
          name={name}
          price={price}
        />
      </div>
    </Link>
  )
}

function CardImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className='relative aspect-square w-full overflow-hidden'>
      <Image
        src={imageUrl}
        alt='product image'
        fill
        className='object-fill transition-transform duration-300 group-hover:scale-110'
      />
    </div>
  )
}

function CardDetail({
  name,
  price,
}: {
  name: ProductCardProps['name']
  price: ProductCardProps['price']
}) {
  return (
    <div className='flex size-full justify-between gap-cozy'>
      <span className='flex-1 cursor-pointer truncate text-body-sm font-semi-bold text-primary-625 group-hover:underline'>
        {name}
      </span>
      <div className='text-body-sm font-semi-bold text-primary-418'>$ {price}</div>
    </div>
  )
}
