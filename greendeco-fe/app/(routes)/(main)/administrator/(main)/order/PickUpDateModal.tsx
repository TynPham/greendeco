import {
	OrderState,
	ProcessStatusRequest,
	updateOrderProcessStatus,
} from '@/app/_api/axios/admin/order'
import Button from '@/app/_components/Button'
import { TextField } from '@/app/_components/form'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OrderUpdateSchema, OrderUpdateSchemaType } from '@/app/_configs/schemas/order'
import { notifyUpdateCancelSuccess } from './Notification'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import createNotificationMessage from '@/app/_hooks/useOrderNotificationMessage'
import { useRef } from 'react'
import useClickOutside from '@/app/_hooks/useClickOutside'

type PickUpdateModalType = {
	order: OrderState
}

export default function PickUpDateModal({ order }: PickUpdateModalType) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
	const queryClient = useQueryClient()
	const { closeDialog } = useDialogStore()
	const orderPickUpDateModalRef = useRef<any>()

	useClickOutside(orderPickUpDateModalRef, () => {
		closeDialog()
	})
	const defaultInputValues: OrderUpdateSchemaType = {
		paid_at: '',
	}
	const { register, handleSubmit, reset } = useForm<ProcessStatusRequest>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(OrderUpdateSchema),
		defaultValues: defaultInputValues,
	})

	const updateStatusMutation = useMutation({
		mutationFn: updateOrderProcessStatus,
		onSuccess: () => {
			notifyUpdateCancelSuccess(order.order_id, ORDER_STATE_FIELD.processing.state)
			queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order] })
			closeDialog()
			reset()
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	const handleOnSubmit: SubmitHandler<ProcessStatusRequest> = (values, e) => {
		e?.preventDefault()

		const notificationMessage = createNotificationMessage(
			order.order_id,
			ORDER_STATE_FIELD.processing.state,
		)

		updateStatusMutation.mutate({
			adminAccessToken: adminAccessToken!,
			orderId: order.order_id,
			state: ORDER_STATE_FIELD.processing.state,
			paid_at: new Date(values.paid_at).toISOString(),
			//NOTE: chnage the message and tilte data for processing status
			message: notificationMessage.message,
			title: notificationMessage.title,
			userId: order.owner_id,
		})
	}

	return (
		<div className='container sticky top-0 flex h-full max-h-screen w-full items-center justify-center'>
			<div
				ref={orderPickUpDateModalRef}
				className='overflow-hidden rounded-[16px] border border-order-status-processing'
			>
				<div className='flex w-full flex-col items-center gap-compact bg-order-status-processing p-comfortable text-white'>
					<p className='text-body-md font-bold uppercase'>Updating Order to processing</p>
					<p className='text-body-md'>
						Enter the customer&apos;s payment date to complete the process
					</p>
				</div>
				<form
					onSubmit={handleSubmit(handleOnSubmit)}
					className='flex flex-col justify-center gap-cozy bg-neutral-gray-1 p-comfortable text-body-md'
				>
					<TextField
						type='datetime-local'
						label='Date: '
						placeholder=''
						error={false}
						register={register('paid_at')}
					/>
					<div className='flex justify-end gap-compact text-body-sm'>
						<Button
							disabled={updateStatusMutation.isLoading}
							onClick={closeDialog}
							className='border-order-status-processing bg-neutral-gray-1 px-comfortable text-order-status-processing disabled:opacity-70'
						>
							Cancel
						</Button>
						<Button
							disabled={updateStatusMutation.isLoading}
							className='w-fit border-0 bg-order-status-processing px-comfortable '
							type='submit'
						>
							{updateStatusMutation.isLoading ? 'Processing' : 'Confirm'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
