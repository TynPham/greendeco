import ProductSkeleton from '@/src/app/_components/product/product-skeleton'

const classWrapper = 'grid-cols-1 gap-cozy md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5'

const breakpoints = [
  { className: 'hidden xl:grid', count: 5 },
  { className: 'hidden lg:grid xl:hidden', count: 3 },
  { className: 'hidden md:grid lg:hidden', count: 2 },
  { className: 'grid md:hidden', count: 1 },
]

export default function ProductFallback() {
  return (
    <div className='grid gap-cozy'>
      {breakpoints.map((bp, index) => (
        <div
          key={index}
          className={`${bp.className} ${classWrapper}`}
        >
          <ProductSkeleton count={bp.count} />
        </div>
      ))}
    </div>
  )
}
