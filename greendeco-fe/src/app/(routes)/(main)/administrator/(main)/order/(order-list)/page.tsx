'use client'
import React from 'react'
import OrderTable from './OrderTable'
import useQueryParams from '@/src/hooks/useQueryParams'
import { TailSpin } from 'react-loader-spinner'
import { FilterParams } from '@/src/types'
import { useGetOrderListTableQuery } from '@/src/queries/order'

export default function OrderManagementPage() {
  const { queryObject } = useQueryParams<FilterParams>()
  const orderQuery = useGetOrderListTableQuery({ params: { limit: 9999, ...queryObject } })
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
