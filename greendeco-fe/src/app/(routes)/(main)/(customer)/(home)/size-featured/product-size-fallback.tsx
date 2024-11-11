import ProductSkeleton from '@/src/app/_components/product/product-skeleton'

const breakpoints = [
  { className: 'hidden xl:flex', count: 3, width: '250px' },
  { className: 'hidden lg:flex xl:hidden', count: 2, width: '300px' },
  { className: 'flex lg:hidden', count: 1, width: '300px' },
]

export default function ProductSizeFallback() {
  return (
    <div className='grid gap-cozy'>
      {breakpoints.map((bp, index) => (
        <div
          key={index}
          className={`${bp.className} justify-center gap-8`}
        >
          <ProductSkeleton
            count={bp.count}
            skeletonTheme={{
              baseColor: '#595d58',
              highlightColor: '#f7f8f7',
              width: bp.width,
            }}
          />
        </div>
      ))}
    </div>
  )
}
