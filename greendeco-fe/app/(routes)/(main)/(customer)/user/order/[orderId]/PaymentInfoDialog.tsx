import PaymentInformation from '@/app/(routes)/(main)/payment/[orderId]/PaymentInformation'
import { OrderData } from '@/app/_api/axios/order'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useRef } from 'react'
import useClickOutside from '@/app/_hooks/useClickOutside'
import VNPayButton from '@/app/_components/paymentButton/VNPayButton'
import { FUNDING, PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import { createPaypalPayment, paypalOnApprove } from '@/app/_api/axios/payment'

export default function PaymentInfoDialog({ orderId }: { orderId: OrderData['id'] }) {
	const { closeDialog } = useDialogStore()
	const paymentInfoDialogRef = useRef<any>()

	useClickOutside(paymentInfoDialogRef, () => {
		closeDialog()
	})
	return (
		<div className='flex-center sticky top-0 z-50 h-full max-h-screen w-full '>
			<div
				ref={paymentInfoDialogRef}
				className='flex-col-start relative items-center gap-cozy rounded-[16px] bg-primary-625 p-comfortable'
			>
				<div className=' text-center text-body-md text-neutral-gray-1'>
					<h3>Your Order ID:</h3>
					<p>{orderId}</p>
				</div>
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
				<p className=' text-heading-2 font-semi-bold text-neutral-gray-1'>
					Thank you for shopping at GreenDeco <span className='text-[3rem]'>🫶 🥰</span>
				</p>
				<button
					type='button'
					onClick={closeDialog}
					className='absolute right-comfortable top-comfortable text-neutral-gray-1 hover:cursor-pointer'
				>
					<XMarkIcon className='aspect-square h-[24px]' />
				</button>
			</div>
		</div>
	)
}
