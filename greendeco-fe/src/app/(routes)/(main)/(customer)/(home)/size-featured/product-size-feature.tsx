import Link from 'next/link'

import path from '@/src/constants/path'
import { ProductSizeContent } from './product-size-content'

export default function ProductSizeFeature() {
  return (
    <section className='section-home flex bg-primary-625-40/50 pt-0 sm:pt-10 md:pt-20'>
      <div className='container h-full'>
        <div className='grid grid-cols-6 gap-comfortable px-10'>
          <FeatureDescription />
          <ProductSizeContent />
        </div>
      </div>
    </section>
  )
}

function FeatureDescription() {
  return (
    <div className='col-span-6 flex min-h-[400px] flex-col justify-center gap-cozy sm:mx-24 md:col-span-3 md:mx-0 lg:col-span-2'>
      <h2 className='text-[3rem] text-primary-625'>It Comes With Different Sizes!</h2>
      <p className='text-body-md text-primary-418'>
        We are able to offer you a wide range of beautiful plants in various sizes. Any tree, no
        matter how big or small, is willing to be your friend.
      </p>
      <Link
        href={path.products}
        className='btn w-fit px-comfortable text-body-sm'
      >
        View More
      </Link>
    </div>
  )
}
