import { OrderData } from '@/src/app/_api/axios/order'
import { OrderState } from '@/src/app/_configs/constants/paramKeys'
import { ORDER_STATE_FIELD } from '@/src/app/_configs/constants/variables'
import usePaymentInfoDialog from '@/src/app/_hooks/dialog/usePaymentInfoDialog'
import formatDate from '@/src/app/_hooks/useFormatDate'
import {
  UserCircleIcon,
  EnvelopeIcon,
  PhoneIcon,
  TruckIcon,
  BanknotesIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Button from '@/src/app/_components/Button'

export default function OrderDetailContainer({ order }: { order: OrderData }) {
  return (
    <>
      <div className='grid grid-cols-3 gap-cozy'>
        <div className='col-span-2'>
          <OrderDetail {...order} />
        </div>
        <div>
          <CustomerAndShippingDetail {...order} />
        </div>
      </div>
      {order.state === OrderState.Cancelled && (
        <div className='mt-cozy flex items-center gap-compact rounded-[8px] border-[2px] border-status-error/80 p-cozy text-body-md font-semi-bold text-status-error/80'>
          <ExclamationCircleIcon className='aspect-square h-[32px]'></ExclamationCircleIcon>
          <span>Cancel Reason: {getReason(order.description)}</span>
        </div>
      )}
    </>
  )
}

function OrderDetail({ id, created_at, state, paid_at }: OrderData) {
  const { openPaymentInfoDialog } = usePaymentInfoDialog()
  return (
    <div className='flex-col-start divide-y divide-primary-625-60 '>
      <div className='flex items-center justify-between py-compact'>
        <h2 className='text-body-lg font-semi-bold'>Order Info</h2>
        {!paid_at && state !== ORDER_STATE_FIELD.cancelled.state && (
          <Button
            onClick={() => {
              openPaymentInfoDialog(id)
            }}
            className='px-comfortable py-compact'
          >
            Proceed to pay
          </Button>
        )}
      </div>
      <div className='flex-col-start gap-common p-cozy text-body-sm'>
        <div className='grid grid-cols-4 '>
          <span className='flex items-center font-semi-bold'>ID:</span>
          <span className='col-span-3'>{id}</span>
        </div>
        <div className='grid grid-cols-4'>
          <span className='flex items-center font-semi-bold'>Date Created:</span>
          <span className='col-span-3'>{formatDate(new Date(created_at))}</span>
        </div>
        <div className='grid grid-cols-4'>
          <span className='flex items-center font-semi-bold'>Order Status:</span>
          <span className='col-span-3'>
            <span
              className={clsx(
                'rounded-[16px] border-[1px] px-cozy py-compact font-semi-bold capitalize text-white',
                {
                  'bg-order-status-draft': state === OrderState.Draft,
                  'bg-order-status-processing': state === OrderState.Processing,
                  'bg-order-status-completed': state === OrderState.Completed,
                  'bg-order-status-cancelled': state === OrderState.Cancelled,
                },
              )}
            >
              {state}
            </span>
          </span>
        </div>
        <div className='grid grid-cols-4'>
          <span className='flex items-center font-semi-bold'>Payment Status:</span>
          <span className='col-span-3'>
            {paid_at ? (
              <span className='flex w-fit items-center gap-[4px] rounded-[16px] border-[1px] border-status-success bg-status-success px-cozy py-compact font-semi-bold text-neutral-gray-1'>
                Payment Received <BanknotesIcon className='aspect-square h-[16px]'></BanknotesIcon>
              </span>
            ) : (
              <span className='flex w-fit items-center gap-[4px] rounded-[16px] border-[1px] border-status-success  px-cozy py-compact font-semi-bold text-status-success'>
                Waiting for Payment
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}

function CustomerAndShippingDetail({
  user_name,
  user_phone_number,
  user_email,
  shipping_address,
}: OrderData) {
  return (
    <div className='flex-col-start  divide-y divide-primary-418-60 rounded-[8px] border-[2px] border-primary-625-60 p-cozy shadow-18'>
      <div className='flex-col-start gap-[4px] pb-cozy text-body-sm '>
        <h2 className='mb-[4px] text-body-lg font-semi-bold text-primary-625'>Customer</h2>
        <span className='flex items-center gap-compact'>
          <UserCircleIcon className='aspect-square h-[20px] text-primary-5555' />
          {user_name}
        </span>
        <span className='flex items-center gap-compact'>
          <EnvelopeIcon className='aspect-square h-[20px] text-primary-5555' />
          {user_email}
        </span>
        <span className='flex items-center gap-compact'>
          <PhoneIcon className='aspect-square h-[20px] text-primary-5555' />
          {user_phone_number}
        </span>
      </div>
      <div className='flex-col-start gap-[4px] pt-cozy text-body-sm '>
        <div className='flex items-center gap-compact text-primary-625'>
          <TruckIcon className='aspect-square h-[20px]' />
          <h2 className=' text-body-lg font-semi-bold'>Shipping Address</h2>
        </div>
        <span className='flex items-center gap-compact'>{shipping_address}</span>
      </div>
    </div>
  )
}

function getReason(string: string) {
  const slug = string.split(':').pop()
  return slug
}
