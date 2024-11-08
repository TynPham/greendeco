import { OrderData, OrderListData } from '@/src/app/_api/axios/order'
import { USER_SETTING_ROUTE } from '@/src/app/_configs/constants/variables'
import formatDate from '@/src/app/_hooks/useFormatDate'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Link from 'next/link'

export default function UserOrderList({ orderList }: { orderList: OrderListData['items'] }) {
  return (
    <ul className='flex-col-start w-full gap-compact'>
      {orderList.map((order) => (
        <li key={order.id}>
          <OrderItem order={order} />
        </li>
      ))}
    </ul>
  )
}

const OrderItem = ({ order }: { order: OrderData }) => {
  return (
    <div className='flex items-center justify-between rounded-[4px] border-[2px] border-primary-418-20 bg-neutral-gray-1 p-cozy shadow-38'>
      <div className='flex items-center gap-cozy'>
        <span className='text-body-md text-primary-5555-80'>
          Order: <span className='font-semi-bold text-primary-418'>{order.id}</span>
        </span>
      </div>
      <span className='flex items-center gap-cozy'>
        <span className='text-body-xsm text-primary-625-80'>
          {formatDate(new Date(order.created_at))}
        </span>
        <span
          className={clsx(
            'rounded-[16px] px-comfortable py-compact text-center text-body-xsm font-semi-bold capitalize',
            {
              'bg-order-status-draft text-neutral-gray-1': order.state === 'draft',
              'bg-order-status-processing text-neutral-gray-1': order.state === 'processing',
              'bg-order-status-completed text-neutral-gray-1': order.state === 'completed',
              'bg-order-status-cancelled text-neutral-gray-1': order.state === 'cancelled',
            },
          )}
        >
          {order.state}
        </span>
        <Link
          href={`${USER_SETTING_ROUTE.ORDER.LINK}/${order.id}`}
          className='btn w-fit px-comfortable py-compact'
        >
          <span className='flex w-full items-center justify-center gap-[4px] text-body-sm text-neutral-gray-1'>
            View
            <DocumentMagnifyingGlassIcon className='aspect-square h-[20px]' />
          </span>
        </Link>
      </span>
    </div>
  )
}
