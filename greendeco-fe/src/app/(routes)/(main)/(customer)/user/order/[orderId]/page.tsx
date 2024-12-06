'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import OrderDetailContainer from './OrderDetailContainer'
import OrderProductList from './OrderProductList'
import OrderPrice from './OrderPrice'
import UserOrderDetailLoading from './loading'
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useRouter, useSearchParams } from 'next/navigation'
import { USER_SETTING_ROUTE } from '@/src/configs/constants/variables'
import { useGetOrderFullDetailByIdQuery } from '@/src/queries/order'
import { getAccessTokenFromLocalStorage } from '@/src/utils/localStorage'
import { useEffect } from 'react'
import { TokenType } from '@/src/constants/token'
import { toast } from 'react-toastify'

export default function OrderDetailPage({
  params: { orderId }
}: {
  params: {
    orderId: string
  }
}) {
  const orderDetailQuery = useGetOrderFullDetailByIdQuery({ id: orderId })

  const searchParams = useSearchParams()
  const accessToken = getAccessTokenFromLocalStorage()
  const router = useRouter()

  useEffect(() => {
    const tokenCallBack = searchParams.get(TokenType.ACCESS_TOKEN)
    if (tokenCallBack && accessToken) {
      if (tokenCallBack === accessToken) {
        const status = searchParams.get('status')
        if (status === 'success') {
          toast.success('The order has been paid successfully')
        } else if (status === 'error') {
          toast.success('Something went wrong')
        }
        router.replace(`/user/order/${orderId}`)
      }
    }
  }, [searchParams, accessToken])

  const { data, isLoading, isError } = orderDetailQuery
  return (
    <div>
      {isLoading && <UserOrderDetailLoading />}
      {data && (
        <>
          <div className='mb-cozy flex items-center justify-between gap-cozy'>
            <h1 className='text-heading-1 text-primary-418'>Order Detail</h1>
            <Link href={USER_SETTING_ROUTE.ORDER.LINK}>
              <span className='group flex items-center gap-compact text-body-sm hover:underline'>
                <ArrowLeftIcon className='aspect-square w-[20px] transition duration-75 ease-out group-hover:translate-x-[-4px]' />
                Back to Order List
              </span>
            </Link>
          </div>
          <div className='px-cozy'>
            <OrderDetailContainer order={data.order} />
            <OrderProductList productList={data.productList} />
            <OrderPrice
              coupon_id={data.order.coupon_id}
              coupon_discount={data.order.coupon_discount}
              price={data.price}
            />
          </div>
        </>
      )}
      {isError && <ErrorMessage />}
    </div>
  )
}

function ErrorMessage() {
  const router = useRouter()
  return (
    <div className='flex h-[200px] w-full items-center justify-center text-status-error'>
      <span className='flex-col-center gap-compact'>
        <ExclamationTriangleIcon className='aspect-square h-[80px]' />

        <span className='flex items-center gap-compact text-body-md'>
          <p className=' font-semi-bold'>Oops, something went wrong!</p>
          <span
            className='font-regular  underline hover:cursor-pointer hover:font-bold'
            onClick={() => router.back()}
          >
            Go back?
          </span>
        </span>
      </span>
    </div>
  )
}
