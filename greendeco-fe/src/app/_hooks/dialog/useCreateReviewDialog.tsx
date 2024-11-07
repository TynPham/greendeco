'use client'

import ReviewDialogContainer from '@/src/app/_components/review'
import { ReviewDialogProps } from '@/src/app/_components/review/ReviewDialog'
import { useDialogStore } from '@/src/app/_configs/store/useDialogStore'

export default function useCreateProductReviewDialog(props: ReviewDialogProps) {
  const { openDialog } = useDialogStore()

  const openCreateProductReviewDialog = () => {
    openDialog(<ReviewDialogContainer {...props} />)
  }

  return { openCreateProductReviewDialog: openCreateProductReviewDialog }
}
