'use client'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import { useMutation } from '@tanstack/react-query'
import { MultilineTextField } from '@/app/_components/form/MultiplelineTextField'
import { ReviewFormInputType, ReviewSchema } from '@/app/_configs/schemas/review'
import Rating from '../form/Rating'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'
import { ProductData } from '@/app/_api/axios/product'
import { createProductReview } from '@/app/_api/axios/reviews'
import { AxiosError } from 'axios'
import { notifySendReviewSuccess } from './Notifications'
import { UNAUTHORIZE_STATUS } from '@/app/_configs/constants/status'
import { useRouter } from 'next/navigation'

export default function CreateReviewForm({ productId }: { productId: ProductData['id'] }) {
	const { closeDialog } = useDialogStore()
	const router = useRouter()
	const defaultInputValues: ReviewFormInputType = {
		content: '',
		star: '0',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ReviewFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ReviewSchema),
		defaultValues: defaultInputValues,
	})

	const createReviewMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: createProductReview,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: () => {
			notifySendReviewSuccess()
			closeDialog()
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				if (e.response?.status === UNAUTHORIZE_STATUS) {
					router.push('/login')
				}
			}
		},
	})

	const onSubmitHandler: SubmitHandler<ReviewFormInputType> = (values, e) => {
		e?.preventDefault()
		createReviewMutation.mutate({
			product_id: productId,
			star: parseInt(values.star),
			content: values.content,
		})
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
								hidden: createReviewMutation.isLoading,
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
