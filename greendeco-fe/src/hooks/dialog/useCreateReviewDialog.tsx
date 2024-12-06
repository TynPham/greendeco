'use client'

import ReviewDialogContainer from '@/src/components/review'
import { ReviewDialogProps } from '@/src/components/review/ReviewDialog'
import { useDialogStore } from '@/src/configs/store/useDialogStore'

export default function useCreateProductReviewDialog(props: ReviewDialogProps) {
  const { openDialog } = useDialogStore()

  const openCreateProductReviewDialog = () => {
    openDialog(<ReviewDialogContainer {...props} />)
  }

  return { openCreateProductReviewDialog: openCreateProductReviewDialog }
}
