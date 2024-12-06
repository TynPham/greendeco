'use client'

import Button from '@/src/components/Button'
import { TextField } from '@/src/components/form'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/configs/constants/cookies'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { OrderUpdateSchema, OrderUpdateSchemaType } from '@/src/configs/schemas/order'
import { notifyUpdateCancelSuccess } from './Notification'
import { ORDER_STATE_FIELD } from '@/src/configs/constants/variables'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/src/configs/constants/queryKey'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import createNotificationMessage from '@/src/hooks/useOrderNotificationMessage'
import { useRef } from 'react'
import useClickOutside from '@/src/hooks/useClickOutside'
import { useUpdateOrderProcessStatusMutation } from '@/src/queries/order'
import { handleErrorApi } from '@/src/utils/utils'
import { OrderStateTable, ProcessStatusRequest } from '@/src/types/order.type'

type PickUpdateModalType = {
  order: OrderStateTable
}

export default function PickUpDateModal({ order }: PickUpdateModalType) {
  const adminAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
  const queryClient = useQueryClient()
  const { closeDialog } = useDialogStore()
  const orderPickUpDateModalRef = useRef<any>()

  useClickOutside(orderPickUpDateModalRef, () => {
    closeDialog()
  })
  const defaultInputValues: OrderUpdateSchemaType = {
    paid_at: ''
  }
  const { register, handleSubmit, reset, setError } = useForm<ProcessStatusRequest>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(OrderUpdateSchema),
    defaultValues: defaultInputValues
  })

  const updateStatusMutation = useUpdateOrderProcessStatusMutation()

  const handleOnSubmit: SubmitHandler<ProcessStatusRequest> = async (values) => {
    if (updateStatusMutation.isLoading) return

    try {
      const notificationMessage = createNotificationMessage(
        order.order_id,
        ORDER_STATE_FIELD.processing.state
      )

      await updateStatusMutation.mutateAsync({
        orderId: order.order_id,
        state: ORDER_STATE_FIELD.processing.state,
        paid_at: new Date(values.paid_at).toISOString(),
        //NOTE: chnage the message and tilte data for processing status
        message: notificationMessage.message,
        title: notificationMessage.title,
        userId: order.owner_id
      })

      notifyUpdateCancelSuccess(order.order_id, ORDER_STATE_FIELD.processing.state)
      closeDialog()
      reset()
    } catch (error) {
      handleErrorApi({ error, setError })
    }
  }

  return (
    <div className='container sticky top-0 flex size-full max-h-screen items-center justify-center'>
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
