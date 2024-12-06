'use client'
import Button from '@/src/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'
import { MultilineTextField } from '@/src/components/form/MultiplelineTextField'
import { ReviewFormInputType, ReviewSchema } from '@/src/configs/schemas/review'
import Rating from '../form/Rating'
import { useDialogStore } from '@/src/configs/store/useDialogStore'
import { useCreateProductReviewMutation } from '@/src/queries/review'
import { handleErrorApi } from '../../utils/utils'
import { toast } from 'react-toastify'
import { ProductData } from '../../types/product.type'

export default function CreateReviewForm({ productId }: { productId: ProductData['id'] }) {
  const { closeDialog } = useDialogStore()
  const defaultInputValues: ReviewFormInputType = {
    content: '',
    star: '0'
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ReviewFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ReviewSchema),
    defaultValues: defaultInputValues
  })

  const createReviewMutation = useCreateProductReviewMutation()

  const onSubmitHandler: SubmitHandler<ReviewFormInputType> = async (values) => {
    if (createReviewMutation.isLoading) return

    try {
      await createReviewMutation.mutateAsync({
        product_id: productId,
        star: parseInt(values.star),
        content: values.content
      })
      reset()
      toast.success('Review sent successfully')
      closeDialog()
    } catch (error) {
      handleErrorApi({ error, setError })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='w-full'
    >
      <>
        <div className='flex-col-start gap-cozy text-body-md'>
          <div>
            <Rating
              label='Rating'
              className='gap-0'
              starWrapperClassName='h-[56px]'
              register={register('star')}
              error={Boolean(errors?.star)}
              helperText={errors?.star?.message}
            />
          </div>
          <div className='flex-1'>
            <MultilineTextField
              label='Comment'
              placeholder='Leave your comment here'
              className='h-[200px]'
              register={register('content')}
              error={Boolean(errors?.content)}
              helperText={errors?.content?.message}
            />
          </div>
          <div className='flex w-full  gap-cozy'>
            <Button
              className={clsx('btnSecondary flex-1', {
                hidden: createReviewMutation.isLoading
              })}
              type='button'
              onClick={closeDialog}
              disabled={createReviewMutation.isLoading}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              className='flex-1'
              disabled={createReviewMutation.isLoading}
            >
              {createReviewMutation.isLoading ? 'Sending...' : 'Send Review!'}
            </Button>
          </div>
        </div>
      </>
    </form>
  )
}
