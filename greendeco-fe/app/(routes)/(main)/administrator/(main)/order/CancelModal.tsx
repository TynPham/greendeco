import { OrderState, StatusRequest, updateOrderStatusSendNoti } from '@/app/_api/axios/admin/order'
import Button from '@/app/_components/Button'
import { MultilineTextField } from '@/app/_components/form'
import {
	CreateNotificationInputType,
	CreateNotificationSchema,
} from '@/app/_configs/schemas/notification'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { notifyUpdateCancelSuccess } from './Notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { getCookie } from 'cookies-next'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import createNotificationMessage from '@/app/_hooks/useOrderNotificationMessage'
import { useRef } from 'react'
import useClickOutside from '@/app/_hooks/useClickOutside'

type CancelModalType = {
	order: OrderState
}

export default function CancelModal({ order }: CancelModalType) {
	const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
	const queryClient = useQueryClient()
	const { closeDialog } = useDialogStore()
	const orderCancelModalRef = useRef<any>()

	useClickOutside(orderCancelModalRef, () => {
		closeDialog()
	})
	const defaultInputValues: CreateNotificationInputType = {
		// Change the title for notification
		title: 'Cancel Order ' + order.order_id,
		message: '',
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<StatusRequest>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(CreateNotificationSchema),
		defaultValues: defaultInputValues,
	})

	const updateCancelStatusMutation = useMutation({
		mutationFn: updateOrderStatusSendNoti,
		onSuccess: () => {
			notifyUpdateCancelSuccess(order.order_id, ORDER_STATE_FIELD.cancelled.state)
			queryClient.invalidateQueries({ queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order] })
			closeDialog()
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	const handleOnSubmitCancel: SubmitHandler<StatusRequest> = (values, e) => {
		e?.preventDefault()

		const notifcationMessage = createNotificationMessage(
			order.order_id,
			ORDER_STATE_FIELD.cancelled.state,
			values.message,
		)

		updateCancelStatusMutation.mutate({
			adminAccessToken: adminAccessToken!,
			orderId: order.order_id,
			userId: order.owner_id,
			message: notifcationMessage.message,
			// title for cancel message
			title: notifcationMessage.title,
			state: ORDER_STATE_FIELD.cancelled.state,
		})
	}
	return (
		<div className='container sticky top-0 flex h-full max-h-screen w-full items-center justify-center'>
			<div
				ref={orderCancelModalRef}
				className='w-[40vw] overflow-hidden rounded-[16px] border border-order-status-cancelled'
			>
				<div className='flex w-full flex-col items-center gap-compact bg-order-status-cancelled p-comfortable text-white'>
					<p className='text-body-md font-bold uppercase'>
						Cancelling order confirmation
					</p>
					<p className='text-body-md'>Enter the reason to cancel this order</p>
				</div>
				<form
					onSubmit={handleSubmit(handleOnSubmitCancel)}
					className='flex flex-col justify-center gap-cozy bg-neutral-gray-1 p-comfortable text-body-md'
				>
					<div className='flex-col-start gap-compact'>
						<p className='font-bold'>Order ID:</p>
						<p>{order.order_id}</p>
					</div>

					<MultilineTextField
						type='text'
						label='Reason: '
						placeholder='Order Cancel Reason'
						register={register('message')}
						error={Boolean(errors?.message)}
						helperText={errors?.message?.message}
						className='h-[200px]'
					/>
					<div className='flex justify-end gap-compact text-body-sm'>
						<Button
							disabled={updateCancelStatusMutation.isLoading}
							onClick={closeDialog}
							className='border-order-status-cancelled bg-neutral-gray-1 px-comfortable text-order-status-cancelled disabled:opacity-70'
						>
							Abort
						</Button>
						<Button
							disabled={updateCancelStatusMutation.isLoading}
							className='w-fit border-0 bg-order-status-cancelled px-comfortable'
							type='submit'
						>
							{updateCancelStatusMutation.isLoading ? 'Processing' : 'Confirm'}
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}
