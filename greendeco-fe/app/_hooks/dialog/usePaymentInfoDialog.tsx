'use client'

import PaymentInfoDialog from '@/app/(routes)/(main)/(customer)/user/order/[orderId]/PaymentInfoDialog'
import { OrderData } from '@/app/_api/axios/order'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'

export default function usePaymentInfoDialog() {
	const { openDialog } = useDialogStore()

	const openPaymentInfoDialog = (orderId: OrderData['id']) => {
		openDialog(<PaymentInfoDialog orderId={orderId} />)
	}

	return { openPaymentInfoDialog: openPaymentInfoDialog }
}
