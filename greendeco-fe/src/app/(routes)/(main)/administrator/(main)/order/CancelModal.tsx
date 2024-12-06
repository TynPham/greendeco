'use client'

import Button from '@/src/components/Button'
import { MultilineTextField } from '@/src/components/form'
import {
  CreateNotificationInputType,
  CreateNotificationSchema
} from '@/src/configs/schemas/notification'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { notifyUpdateCancelSuccess } from './Notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/configs/constants/cookies'
import { getCookie } from 'cookies-next'
import { ORDER_STATE_FIELD } from '@/src/configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/src/configs/constants/queryKey'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import createNotificationMessage from '@/src/hooks/useOrderNotificationMessage'
import { useRef } from 'react'
import useClickOutside from '@/src/hooks/useClickOutside'
import { useUpdateOrderStatusSendNotiMutation } from '@/src/queries/order'
import { handleErrorApi } from '@/src/utils/utils'
import { OrderStateTable, StatusRequest } from '@/src/types/order.type'

type CancelModalType = {
  order: OrderStateTable
}

export default function CancelModal({ order }: CancelModalType) {
  const adminAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
  const queryClient = useQueryClient()
  const { closeDialog } = useDialogStore()
  const orderCancelModalRef = useRef<any>()

  useClickOutside(orderCancelModalRef, () => {
    closeDialog()
  })
  const defaultInputValues: CreateNotificationInputType = {
    // Change the title for notification
    title: 'Cancel Order ' + order.order_id,
    message: ''
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<StatusRequest>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(CreateNotificationSchema),
    defaultValues: defaultInputValues
  })

  const updateCancelStatusMutation = useUpdateOrderStatusSendNotiMutation()
  const handleOnSubmitCancel: SubmitHandler<StatusRequest> = async (values) => {
    if (updateCancelStatusMutation.isLoading) return

    try {
      const notificationMessage = createNotificationMessage(
        order.order_id,
        ORDER_STATE_FIELD.cancelled.state,
        values.message
      )

      await updateCancelStatusMutation.mutateAsync({
        orderId: order.order_id,
        userId: order.owner_id,
        message: notificationMessage.message,
        // title for cancel message
        title: notificationMessage.title,
        state: ORDER_STATE_FIELD.cancelled.state
      })

      notifyUpdateCancelSuccess(order.order_id, ORDER_STATE_FIELD.cancelled.state)
      closeDialog()
    } catch (error) {
      handleErrorApi({ error, setError })
    }
  }
  return (
    <div className='container sticky top-0 flex size-full max-h-screen items-center justify-center'>
      <div
        ref={orderCancelModalRef}
        className='w-[40vw] overflow-hidden rounded-[16px] border border-order-status-cancelled'
      >
        <div className='flex w-full flex-col items-center gap-compact bg-order-status-cancelled p-comfortable text-white'>
          <p className='text-body-md font-bold uppercase'>Cancelling order confirmation</p>
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
