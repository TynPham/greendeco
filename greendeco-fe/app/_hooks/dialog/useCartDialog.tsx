'use client'

import CartDialog from '@/app/_components/cart'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'

export default function useCartDialog() {
	const { openDialog } = useDialogStore()

	const openCart = () => {
		openDialog(<CartDialog />)
	}

	return { openCart: openCart }
}
