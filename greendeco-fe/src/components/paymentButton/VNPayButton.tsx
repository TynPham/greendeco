'use client'

import Button from '../Button'
import { QrCodeIcon } from '@heroicons/react/24/solid'
import { useCreateVNPayPaymentMutation } from '@/src/queries/payment'
import { OrderData } from '../../types/order.type'

export default function VNPayButton({ id }: { id: OrderData['id'] }) {
  const VNPayMutation = useCreateVNPayPaymentMutation({
    onSuccess: (callbackURL) => window.open(callbackURL.callback_url)
  })
  const handleOnClick = () => {
    VNPayMutation.mutate(id)
  }
  return (
    <Button
      onClick={handleOnClick}
      className='flex size-full items-center justify-center gap-compact rounded-[4px] border-none bg-blue-700 p-0 text-neutral-gray-1'
    >
      <QrCodeIcon className='aspect-square h-[24px]' />
      <span className='text-body-sm '>Paying with VN Pay</span>
    </Button>
  )
}
