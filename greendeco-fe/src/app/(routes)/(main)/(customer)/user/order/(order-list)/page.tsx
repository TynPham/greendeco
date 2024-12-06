'use client'

import useQueryParams from '@/src/hooks/useQueryParams'
import UserOrderList from './UserOrderList'
import OrderListPagination from './OrderPagination'
import { MutatingDots } from 'react-loader-spinner'
import { ArchiveBoxXMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { Sort, SortBy } from '@/src/configs/constants/paramKeys'
import { useGetOrderListByUserQuery } from '@/src/queries/order'
import { FilterParams } from '@/src/types'

export default function OrderHistoryPage() {
  const { queryObject } = useQueryParams<FilterParams>()

  const userOrderListQuery = useGetOrderListByUserQuery({
    params: {
      limit: 10,
      sort: Sort.Descending,
      sortBy: SortBy.CreatedAt,
      ...queryObject
    },
    queryObject
  })
  const { data, isLoading, isError } = userOrderListQuery

  return (
    <>
      {isLoading && (
        <div className='flex w-full justify-center'>
          <MutatingDots
            height='100'
            width='100'
            color='#4fa94d'
            secondaryColor='#4fa94d'
            radius='12.5'
            ariaLabel='mutating-dots-loading'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
      {data && data.data.page_size > 0 && (
        <div className='flex-col-start gap-cozy'>
          <UserOrderList orderList={data.data.items} />

          <OrderListPagination
            next={data.data.next}
            prev={data.data.prev}
          />
        </div>
      )}
      {data && data.data.page_size === 0 && <NoItemFoundMessage />}
      {isError && <ErrorMessage />}
    </>
  )
}

function NoItemFoundMessage() {
  return (
    <div className='flex h-[200px] w-full items-center justify-center text-primary-418'>
      <span className='flex-col-center gap-compact'>
        <ArchiveBoxXMarkIcon className='aspect-square h-[80px]' />

        <p className='text-body-md'>Not available</p>
      </span>
    </div>
  )
}

function ErrorMessage() {
  return (
    <div className='flex h-[200px] w-full items-center justify-center text-status-error'>
      <span className='flex-col-center gap-compact'>
        <ExclamationTriangleIcon className='aspect-square h-[80px]' />

        <p className='text-body-md font-semi-bold'>
          Countering errors when trying to get the orders. You can try to re-login your account to
          fix this problem.
        </p>
      </span>
    </div>
  )
}
