'use client'

import { VARIANT_CURRENCY } from '@/src/configs/constants/variables'
import { BanknotesIcon, CreditCardIcon } from '@heroicons/react/24/solid'
import { NOT_FOUND_STATUS, UNAUTHORIZE_STATUS } from '@/src/configs/constants/status'
import { useRouter } from 'next/navigation'
import { useGetOrderPriceQuery } from '@/src/queries/order'
import { OrderData } from '@/src/types/order.type'

export default function PaymentInformation({ orderId }: { orderId: OrderData['id'] }) {
  const router = useRouter()
  const orderPriceQuery = useGetOrderPriceQuery({
    id: orderId,
    onError: (e) => {
      if (e.code === NOT_FOUND_STATUS.toString() || e.response?.status === NOT_FOUND_STATUS) {
        router.back()
      }

      if (e.code === UNAUTHORIZE_STATUS.toString() || e.response?.status === UNAUTHORIZE_STATUS) {
        router.push('/login')
      }
    }
  })

  const { data, isLoading } = orderPriceQuery

  return (
    <div className='flex-col-start w-full divide-y divide-primary-625 rounded-[8px] border-2 border-primary-625 bg-neutral-gray-1 px-comfortable py-cozy text-neutral-gray-10 shadow-15 sm:w-[500px]'>
      <div className='flex items-center justify-between py-cozy'>
        <CreditCardIcon className='aspect-square h-[24px] text-primary-5555' />
        <div className='flex-col-start items-end gap-compact'>
          <p className='text-body-xsm '>
            Account number: <span className='text-body-md font-semi-bold'>12345678</span>
          </p>
          <p className='text-body-xsm '>
            Account owner name: <span className='text-body-md font-semi-bold'>Pham Tuyen</span>
          </p>
          <p className='text-body-xsm '>
            Bank: <span className='text-body-md font-semi-bold'>Vietcombank</span>
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between py-cozy'>
        <BanknotesIcon className='aspect-square h-[24px] text-primary-5555' />
        <span className='text-body-md font-semi-bold'>
          {data && data.data.actual_price && (
            <>
              {data.data?.actual_price} {VARIANT_CURRENCY}
            </>
          )}
          {isLoading && <>--</>}
        </span>
      </div>
      <div className='flex items-center justify-between py-cozy'>
        <p className='text-body-xsm font-semi-bold text-primary-5555'>Transaction Content:</p>
        <span className='text-body-md font-semi-bold'>Full Name + Order ID</span>
      </div>
    </div>
  )
}
