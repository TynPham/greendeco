'use client'

import { useGetProductsFromCompletedOrders } from '@/src/hooks/useGetProductsFromCompletedOrders'
import { useQuery } from '@tanstack/react-query'
import PurchasedProductList from './PurchasedProductList'
import { MutatingDots } from 'react-loader-spinner'
import { ArchiveBoxXMarkIcon } from '@heroicons/react/24/outline'
import { AxiosError } from 'axios'
import { UNAUTHORIZE_STATUS } from '@/src/configs/constants/status'
import { useRouter } from 'next/navigation'
import { USER_PURCHASED_PRODUCTS_QUERY_KEYS } from '@/src/configs/constants/queryKey'

export default function UserReviewPage() {
  const { getProductsFromCompletedOrders } = useGetProductsFromCompletedOrders()
  const router = useRouter()
  const purchasedProductQuery = useQuery({
    queryKey: USER_PURCHASED_PRODUCTS_QUERY_KEYS,
    queryFn: getProductsFromCompletedOrders,
    onError: (e) => {
      if (e instanceof AxiosError) {
        if (e.code === UNAUTHORIZE_STATUS.toString() || e.response?.status === UNAUTHORIZE_STATUS) {
          router.push('/login')
        }
      }
    }
  })

  const { data, isLoading, isError } = purchasedProductQuery
  return (
    <div>
      {isLoading && (
        <div className='flex w-full items-center justify-center'>
          <MutatingDots
            height='100'
            width='100'
            color='#56776C'
            secondaryColor='#56776C'
            radius='12.5'
            ariaLabel='mutating-dots-loading'
            visible={true}
          />
        </div>
      )}
      {data && <PurchasedProductList productList={data} />}
      {isError && (
        <div className='flex h-[200px] w-full items-center justify-center text-primary-418'>
          <span className='flex-col-center gap-compact'>
            <ArchiveBoxXMarkIcon className='aspect-square h-[80px]' />

            <p className='text-body-md'>Not available</p>
          </span>
        </div>
      )}
    </div>
  )
}
