'use client'
import { TextField, Input } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	ProductDetailSchema,
	ProductDetailFormInputType,
} from '@/app/_configs/schemas/createProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createProduct } from '@/app/_api/axios/admin/product'
import {
	SIZE_OPTIONS,
	TYPE_OPTIONS,
	DIFFICULTY_OPTIONS,
	ADMINISTRATOR_ROUTE,
} from '@/app/_configs/constants/variables'
import ImageUploadGrid from './ImagesUploadGrid'
import { useImageUploadStore } from '@/app/_configs/store/useImagesUploadStore'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { notifyCreateProductSuccess } from '../Notifications'
import { MultilineTextField } from '@/app/_components/form/MultiplelineTextField'
import LabelProvider from '@/app/_components/form/LabelProvider'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useRouter } from 'next/navigation'

export default function CreateProductForm() {
	const router = useRouter()
	const { isFulfilled, images, resetImages } = useImageUploadStore()
	const queryClient = useQueryClient()
	const defaultInputValues: ProductDetailFormInputType = {
		name: '',
		size: SIZE_OPTIONS[0],
		type: TYPE_OPTIONS[0],
		light: '',
		water: '',
		difficulty: DIFFICULTY_OPTIONS[0],
		detail: '',
		description: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ProductDetailFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(ProductDetailSchema),
		defaultValues: defaultInputValues,
	})

	const createProductMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: createProduct,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			handleResetForm()
			notifyCreateProductSuccess(data.data.id, {
				onClose: () =>
					router.replace(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${data.data.id}`),
			})
			queryClient.invalidateQueries({
				queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Product],
			})
		},
		//NOTE: Execuse after receving failure responses
		/* onError: (e) => {
			if (e instanceof AxiosError) {
			}
		}, */
	})

	const onSubmitHandler: SubmitHandler<ProductDetailFormInputType> = (values, e) => {
		e?.preventDefault()
		const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
		createProductMutation.mutate({
			productData: { ...values, images: [...images] },
			adminAccessToken: adminAccessToken,
		})
	}

	const handleResetForm = () => {
		resetImages()
		reset()
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className='w-full'
		>
			<div className='grid w-full grid-cols-2 gap-comfortable'>
				<>
					<div className='flex-col-start gap-cozy text-body-md'>
						<div className='flex-1'>
							<TextField
								type='text'
								label='Product Name'
								placeholder='The name of the product'
								register={register('name')}
								error={Boolean(errors?.name)}
								helperText={errors?.name?.message}
							/>
						</div>
						<div className='flex-1'>
							<MultilineTextField
								label='Product Description'
								placeholder='Product Description'
								className='h-[200px]'
								register={register('description')}
								error={Boolean(errors?.description)}
								helperText={errors?.description?.message}
							/>
						</div>
						<div className='flex flex-wrap gap-cozy'>
							<LabelProvider
								direction='vertical'
								label='Plant Type'
							>
								<select
									className='select'
									{...register('type')}
								>
									{TYPE_OPTIONS.map((option) => (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									))}
								</select>
							</LabelProvider>
							<LabelProvider
								label='Size'
								direction='vertical'
							>
								<select
									className='select'
									{...register('size')}
								>
									{SIZE_OPTIONS.map((option) => (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									))}
								</select>
							</LabelProvider>
							<LabelProvider
								direction='vertical'
								label='Caring Difficulty'
							>
								<select
									className='select'
									{...register('difficulty')}
								>
									{DIFFICULTY_OPTIONS.map((option) => (
										<option
											key={option}
											value={option}
										>
											{option}
										</option>
									))}
								</select>
							</LabelProvider>
							<div>
								<TextField
									type='text'
									label='Watering condition'
									placeholder=''
									register={register('water')}
									error={Boolean(errors?.water)}
									helperText={errors?.water?.message}
								/>
							</div>

							<div>
								<TextField
									type='text'
									label='Light Condition'
									placeholder=''
									register={register('light')}
									error={Boolean(errors?.light)}
									helperText={errors?.light?.message}
								/>
							</div>
						</div>
						<div>
							<MultilineTextField
								label='Specific detail of the product'
								placeholder='Product Detail'
								className='h-[200px]'
								register={register('detail')}
								error={Boolean(errors?.detail)}
								helperText={errors?.detail?.message}
							/>
						</div>
					</div>
				</>
				<LabelProvider
					className='text-body-md'
					label='Product Images'
					direction='vertical'
				>
					<ImageUploadGrid />
				</LabelProvider>
			</div>
			<div className='mt-cozy flex w-full justify-end gap-cozy'>
				<Button
					type='submit'
					disabled={createProductMutation.isLoading || isFulfilled() === false}
				>
					{createProductMutation.isLoading ? 'Creating...' : 'Create'}
				</Button>
				<Button
					className='btnSecondary'
					type='button'
					onClick={() => router.back()}
					disabled={createProductMutation.isLoading}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
