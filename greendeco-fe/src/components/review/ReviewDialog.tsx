import CreateReviewForm from './ReviewForm'
import { useRef } from 'react'
import useClickOutside from '@/src/hooks/useClickOutside'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import { ProductData } from '../../types/product.type'

export type ReviewDialogProps = {
  productId: ProductData['id']
}
export default function ReviewDialog(props: ReviewDialogProps) {
  const { closeDialog } = useDialogStore()
  const reviewDialogRef = useRef<any>()

  useClickOutside(reviewDialogRef, () => {
    closeDialog()
  })

  return (
    <div
      ref={reviewDialogRef}
      className='flex min-w-[600px] rounded-[16px] bg-neutral-gray-1 p-comfortable'
    >
      <CreateReviewForm productId={props.productId} />
    </div>
  )
}
