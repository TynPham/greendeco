import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Purchased Products',
  description: 'Where you can view your purchased product and leave a review if you want'
}

export default function UserPurchasedProductPageLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex-col-start w-full gap-cozy'>
      <div className='rounded-[4px] bg-neutral-gray-1 p-cozy shadow-38'>
        <div className='flex-col-start gap-compact'>
          <h1 className='font-semi-bold text-primary-418'>Purchased Products</h1>
          <p className='text-body-sm text-primary-418-80'>
            Where you can revisit or review your finest choices
          </p>
        </div>
      </div>
      {children}
    </div>
  )
}
