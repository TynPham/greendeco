'use client'
import { useState } from 'react'
import { TabOption, ProductFilterType } from './tab-item'
import { TabsWrapper } from './tab-wrapper'
import { ShopAllLink } from './featured-products'
import FeaturedProductCarousel from './featured-product-carousel'

export const PRODUCT_TABS: TabOption[] = [
  { type: 'new', label: 'New Release' },
  { type: 'topRated', label: 'Top Rated' },
  { type: 'cheap', label: 'Student Friendly' },
] as const

export function FeaturedProductsContent() {
  const [activeFilter, setActiveFilter] = useState<ProductFilterType>(PRODUCT_TABS[0].type)
  return (
    <section className='section-home min-h-[500px] bg-primary-5555 px-8'>
      <div className='container'>
        <div className='flex-col-start gap-comfortable'>
          <div className='flex items-end justify-between border-b-[1px] border-neutral-gray-1 py-cozy'>
            <TabsWrapper
              tabs={PRODUCT_TABS}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />
            <ShopAllLink />
          </div>

          <FeaturedProductCarousel type={activeFilter} />
        </div>
      </div>
    </section>
  )
}
