'use client'
import { OrderData } from '@/app/_api/axios/order'
import Image from 'next/image'
import Button from '../Button'
import { useMutation } from '@tanstack/react-query'
import { createVNPayPayment } from '@/app/_api/axios/payment'
import { QrCodeIcon } from '@heroicons/react/24/solid'

export default function VNPayButton({ id }: { id: OrderData['id'] }) {
	const VNPayMutation = useMutation({
		mutationFn: createVNPayPayment,
		onSuccess: (callbackURL) => window.open(callbackURL.data.callback_url, '_blank'),
	})

	const handleOnClick = () => {
		VNPayMutation.mutate(id)
	}
	return (
		<Button
			onClick={handleOnClick}
			className='flex h-full w-full items-center justify-center gap-compact rounded-[4px] border-none bg-blue-700 p-0 text-neutral-gray-1'
		>
			<QrCodeIcon className='aspect-square h-[24px]' />
			<span className='text-body-sm '>Paying with VN Pay</span>
		</Button>
	)
}
