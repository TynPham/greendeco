'use client'

import { Dropdown } from '@/src/components/dropdown'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/configs/constants/cookies'
import { ORDER_STATE_FIELD } from '@/src/configs/constants/variables'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { useState, useEffect } from 'react'
import { notifyUpdateCancelSuccess } from './Notification'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/src/configs/constants/queryKey'
import { notifyError } from '../../../(customer)/user/setting/profile/Notification'
import useOrderUpdateDialog from '@/src/hooks/dialog/useOrderUpdateDialog'
import createNotificationMessage from '@/src/hooks/useOrderNotificationMessage'
import { useUpdateOrderStatusSendNotiMutation } from '@/src/queries/order'
import { OrderStateTable } from '@/src/types/order.type'
import { handleErrorApi } from '@/src/utils/utils'

export default function OrderDropdownState({ order }: { order: OrderStateTable }) {
  const [state, setState] = useState(order.state)
  const adminAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
  const { openOrderUpdateDialog } = useOrderUpdateDialog({ order: order })
  const states = ORDER_STATE_FIELD
  const queryClient = useQueryClient()

  useEffect(() => {
    setState(order.state)
  }, [order.state])

  var stateList: { [key: string]: string[] } = {
    draft: [states.processing.state, states.cancelled.state],
    processing: [states.completed.state, states.cancelled.state],
    completed: [],
    cancelled: []
  }

  const updateOrderStatusComplete = useUpdateOrderStatusSendNotiMutation()

  const handleOnSelect = async (value: string) => {
    if (value === states.processing.state) {
      // open modal => full fill paid at => update
      openOrderUpdateDialog('processing')
    }

    if (value === states.cancelled.state) {
      // update status => create message => send message to user
      openOrderUpdateDialog('cancel')
    }

    if (value === states.completed.state) {
      if (updateOrderStatusComplete.isLoading) return

      try {
        const notificationMessage = createNotificationMessage(
          order.order_id,
          ORDER_STATE_FIELD.completed.state
        )

        await updateOrderStatusComplete.mutateAsync({
          orderId: order.order_id,
          state: states.completed.state,
          //NOTE: full fill message, title for processing state
          message: notificationMessage.message,
          title: notificationMessage.title,
          userId: order.owner_id
        })

        notifyUpdateCancelSuccess(order.order_id, states.completed.state)
      } catch (error) {
        handleErrorApi({ error })
      }
    }
  }

  const baseInputStyle = 'border-0 w-full text-white capitalize text-base '
  return (
    <>
      <Dropdown
        data={stateList[state]}
        value={state}
        onSelect={handleOnSelect}
        inputStyle={
          state === states.draft.state
            ? baseInputStyle + 'bg-order-status-draft'
            : state === states.processing.state
              ? baseInputStyle + 'bg-order-status-processing'
              : state === states.completed.state
                ? baseInputStyle + 'bg-order-status-completed'
                : baseInputStyle + 'bg-order-status-cancelled'
        }
        dropdownContainerStyle={'bg-white'}
      />
    </>
  )
}
