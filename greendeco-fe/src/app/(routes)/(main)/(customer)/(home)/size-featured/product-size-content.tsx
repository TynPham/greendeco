'use client'
import { useState } from 'react'
import { ProductSize } from '@/src/app/_types/product.type'
import { ProductSizeSelector } from './product-size-selector'
import { ProductCarouselContainer } from './product-size-carousel-container'

export function ProductSizeContent() {
  const [activeSize, setActiveSize] = useState<ProductSize>('S')

  return (
    <div className='col-span-6 h-fit px-8 md:col-span-3 lg:col-span-4'>
      <div className='flex-col-start items-center gap-comfortable'>
        <ProductSizeSelector
          activeSize={activeSize}
          onSizeChange={setActiveSize}
        />
        <ProductCarouselContainer size={activeSize} />
      </div>
    </div>
  )
}
