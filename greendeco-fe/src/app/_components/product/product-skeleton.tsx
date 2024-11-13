import * as React from 'react'
import Skeleton, { SkeletonTheme, SkeletonThemeProps } from 'react-loading-skeleton'

export interface ProductSkeletonProps {
  count: number
  skeletonTheme?: SkeletonThemeProps
}

export default function ProductSkeleton({ count, skeletonTheme }: ProductSkeletonProps) {
  return (
    <SkeletonTheme
      baseColor='#e4e8e3'
      highlightColor='#f7f8f7'
      duration={2}
      borderRadius={4}
      {...skeletonTheme}
    >
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <span
            key={index}
            className='flex-col-start gap-compact opacity-20'
          >
            <Skeleton className='h-[300px] flex-1' />
            <p>
              <Skeleton />
            </p>
          </span>
        ))}
    </SkeletonTheme>
  )
}
