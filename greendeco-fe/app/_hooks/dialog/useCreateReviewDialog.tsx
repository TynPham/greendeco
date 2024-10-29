'use client'

import ReviewDialogContainer from '@/app/_components/review'
import { ReviewDialogProps } from '@/app/_components/review/ReviewDialog'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'

export default function useCreateProductReviewDialog(props: ReviewDialogProps) {
	const { openDialog } = useDialogStore()

	const openCreateProductReviewDialog = () => {
		openDialog(<ReviewDialogContainer {...props} />)
	}

	return { openCreateProductReviewDialog: openCreateProductReviewDialog }
}
