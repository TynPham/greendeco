'use client'
import { ClipboardDocumentListIcon, ShoppingBagIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import PaymentInformation from './PaymentInformation'
import { USER_SETTING_ROUTE } from '@/src/app/_configs/constants/variables'
import VNPayButton from '@/src/app/_components/paymentButton/VNPayButton'
import { FUNDING } from '@paypal/react-paypal-js'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { createPaypalPayment, paypalOnApprove } from '@/src/app/_api/axios/payment'
import { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js/types/components/buttons'
import { OrderData } from '@/src/app/_api/axios/order'

export default function PaymentPage({
  params: { orderId },
}: {
  params: {
    orderId: string
  }
}) {
  return (
    <div className='flex-col-start h-full items-center  gap-cozy'>
      <p className=' text-heading font-bold text-primary-625'>
        Thank you for shopping at GreenDeco <span className='text-[3rem]'>🫶 🥰</span>
      </p>
      <div className='flex gap-comfortable'>
        <PaymentGuide orderId={orderId} />
        <div className='flex-col-start gap-cozy'>
          <div className='flex justify-between gap-cozy'>
            <div className='flex-1'>
              <VNPayButton id={orderId} />
            </div>
            <div className='flex-1'>
              <PayPalScriptProvider
                deferLoading={false}
                options={{
                  clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
                }}
              >
                <PayPalButtons
                  createOrder={() => createPaypalPayment(orderId)}
                  onApprove={paypalOnApprove}
                  fundingSource={FUNDING.PAYPAL}
                  style={{ color: 'silver', label: 'buynow' }}
                />
              </PayPalScriptProvider>
            </div>
          </div>
          <PaymentInformation orderId={orderId} />
        </div>
      </div>
    </div>
  )
}

const PaymentGuide = ({ orderId }: { orderId: string }) => {
  return (
    <div className='flex-col-start h-full  justify-center gap-cozy  '>
      <div className='text-center text-neutral-gray-10'>
        <p className='text-body-sm'>Here is your Order ID:</p>
        <p className='text-body-lg font-semi-bold'>{orderId}</p>
      </div>
      <div className='flex-col-start gap-[4px] text-center text-neutral-gray-10'>
        <p className=' text-body-sm'>You can proceed to pay now or later in your order list</p>
        <p className='text-body-sm'>
          Please complete the payment within{' '}
          <span className='font-bold text-status-success'>10 days</span> or this order will be{' '}
          <span className='font-bold text-status-error'>cancelled</span>
        </p>
        <p className='mb-[4px] text-body-sm'>
          Your order will be updated within 24 hours after we recieved your money.
        </p>
      </div>
      <div className='w-full text-center'>
        <div className='flex w-full gap-cozy'>
          <Link
            href={'/'}
            replace
            className='btn flex-1'
          >
            <span className='flex items-center justify-center gap-compact font-semi-bold'>
              <ShoppingBagIcon className='aspect-square h-[24px]' />
              Back to shopping
            </span>
          </Link>
          <Link
            className='btn btnSecondary flex-1'
            replace
            href={USER_SETTING_ROUTE.ORDER.LINK}
          >
            <span className='flex items-center justify-center gap-compact font-semi-bold'>
              View Order List
              <ClipboardDocumentListIcon className='aspect-square h-[24px]' />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}
