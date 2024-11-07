'use client'
import React from 'react'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/src/app/_configs/constants/queryKey'
import { useQuery } from '@tanstack/react-query'
import { getOrderListTable } from '@/src/app/_api/axios/admin/order'
import OrderTable from './OrderTable'
import useQueryParams from '@/src/app/_hooks/useQueryParams'
import { FilterParams } from '@/src/app/_api/axios/product'
import { TailSpin } from 'react-loader-spinner'

export default function OrderManagementPage() {
  const { queryObject } = useQueryParams<FilterParams>()
  const orderQuery = useQuery({
    queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order, queryObject],
    queryFn: () =>
      getOrderListTable({
        limit: 9999,
        ...queryObject,
      }),
  })
  const { data, isLoading } = orderQuery
  const dataMemo = React.useMemo(() => data, [data])
  return (
    <div className='py-comfortable'>
      {isLoading && (
        <div className='flex w-full items-center justify-center'>
          <TailSpin
            height='200'
            width='200'
            color='#4fa94d'
            ariaLabel='tail-spin-loading'
            radius='1'
            wrapperStyle={{}}
            wrapperClass=''
            visible={true}
          />
        </div>
      )}
      {dataMemo && dataMemo.length > 0 && <OrderTable order={dataMemo} />}
    </div>
  )
}
