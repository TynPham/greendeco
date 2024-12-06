import PaymentInformation from '@/src/app/(routes)/(main)/payment/[orderId]/PaymentInformation'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import useClickOutside from '@/src/hooks/useClickOutside'
import VNPayButton from '@/src/components/paymentButton/VNPayButton'
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { createPaypalPayment, paypalOnApprove } from '@/src/_api/payment'
import { OrderData } from '@/src/types/order.type'

export default function PaymentInfoDialog({ orderId }: { orderId: OrderData['id'] }) {
  const { closeDialog } = useDialogStore()
  const paymentInfoDialogRef = useRef<any>()

  useClickOutside(paymentInfoDialogRef, () => {
    closeDialog()
  })
  return (
    <div className='flex-center sticky top-0 z-50 size-full max-h-screen px-4'>
      <div
        ref={paymentInfoDialogRef}
        className='flex-col-start relative items-center gap-cozy rounded-[16px] bg-primary-625 p-8 sm:p-comfortable'
      >
        <div className=' text-center text-body-md text-neutral-gray-1'>
          <h3>Your Order ID:</h3>
          <p>{orderId}</p>
        </div>
        <div className='flex-col-start w-full gap-cozy'>
          <div className='flex justify-between gap-cozy'>
            <div className='flex-1'>
              <VNPayButton id={orderId} />
            </div>
            <div className='flex-1'>
              <PayPalScriptProvider
                deferLoading={false}
                options={{
                  clientId: `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`
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
        <p className=' text-center text-heading-2 font-semi-bold text-neutral-gray-1'>
          Thank you for shopping at GreenDeco <span className='text-[3rem]'>🫶 🥰</span>
        </p>
        <button
          type='button'
          onClick={closeDialog}
          className='absolute right-comfortable top-5 text-neutral-gray-1 hover:cursor-pointer'
        >
          <XMarkIcon className='aspect-square h-[24px]' />
        </button>
      </div>
    </div>
  )
}
