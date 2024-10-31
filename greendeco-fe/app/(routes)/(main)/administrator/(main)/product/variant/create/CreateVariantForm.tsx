'use client'
import { TextField, MultilineTextField } from '@/app/_components/form'
import Button from '@/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VariantSchema, VariantFormInputType } from '@/app/_configs/schemas/variantMangement'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { AxiosError } from 'axios'
import VariantImage from '../VariantImage'
import LabelProvider from '@/app/_components/form/LabelProvider'
import { useState } from 'react'
import { ProductData } from '@/app/_api/axios/product'
import { createVariant } from '@/app/_api/axios/admin/product'
import { ADMINISTRATOR_ROUTE, VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import { notifyCreateVariantSuccess } from '../../Notifications'
import { useRouter } from 'next/navigation'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'

export default function CreateVariantForm({
	productId,
	productName,
}: {
	productId: ProductData['id']
	productName: ProductData['name']
}) {
	const queryClient = useQueryClient()
	const router = useRouter()

	const [variantImage, setVariantImage] = useState<string | undefined>()
	const defaultInputValues: VariantFormInputType = {
		color: '',
		is_default: false,
		available: false,
		price: '0',
		color_name: '',
		description: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<VariantFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(VariantSchema),
		defaultValues: defaultInputValues,
	})

	const createVariantMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: createVariant,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			notifyCreateVariantSuccess()
			queryClient.invalidateQueries({
				queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Variant, productId],
			})
			router.replace(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${productId}`)
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				console.log(e)
			}
		},
	})

	const onSubmitHandler: SubmitHandler<VariantFormInputType> = (values, e) => {
		e?.preventDefault()

		const adminAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

		const { price, color_name, ...restValues } = values
		if (variantImage) {
			createVariantMutation.mutate({
				variantData: {
					...restValues,
					product_id: productId,
					name: `${productName} ${color_name}`,
					color_name: color_name,
					price: parseInt(price),
					image: variantImage,
					currency: VARIANT_CURRENCY,
				},
				adminAccessToken: adminAccessToken,
			})
		}
	}

	const handleResetForm = () => {
		reset()
		setVariantImage(undefined)
	}
	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className='w-full'
		>
			<div className='grid w-full grid-cols-2 gap-comfortable'>
				<>
					<div className='flex-col-start gap-cozy text-body-md'>
						<div>
							<TextField
								type='text'
								label='Pot Color Name'
								placeholder='Name of the pot'
								register={register('color_name')}
								error={Boolean(errors?.color_name)}
								helperText={errors?.color_name?.message}
							/>
						</div>
						<div>
							<LabelProvider
								label='Color'
								className='items-center'
							>
								<input
									className=' h-[40px] w-[40px]'
									type='color'
									{...register('color')}
								/>
							</LabelProvider>
						</div>
						<div className='flex flex-1 items-end gap-cozy'>
							<TextField
								className='flex-1'
								type='text'
								label='Price'
								placeholder='Price of the variant'
								register={register('price')}
								error={Boolean(errors?.price)}
								helperText={errors?.price?.message}
							/>
							<span className='text-body-sm font-semi-bold'>{VARIANT_CURRENCY}</span>
						</div>
						<div className='flex-1'>
							<MultilineTextField
								label='Variant description'
								placeholder='Variant description'
								className='h-[160px]'
								register={register('description')}
								error={Boolean(errors?.description)}
								helperText={errors?.description?.message}
							/>
						</div>

						<div>
							<LabelProvider label='Default'>
								<input
									aria-label='set-default-variant'
									type='checkbox'
									className='h-full'
									placeholder='Default Variant'
									{...register('is_default')}
								/>
							</LabelProvider>
						</div>
						<div>
							<LabelProvider label='Avaiable'>
								<input
									aria-label='set-variant-available'
									type='checkbox'
									placeholder='Variant Available'
									{...register('available')}
								/>
							</LabelProvider>
						</div>
					</div>
				</>
				<div className='text-body-md'>
					<LabelProvider
						label='Variant Image'
						direction='vertical'
					>
						<VariantImage
							image={variantImage}
							setImage={setVariantImage}
						/>
					</LabelProvider>
				</div>
			</div>
			<div className='mt-cozy flex w-full justify-end gap-cozy'>
				<Button
					type='submit'
					disabled={variantImage === undefined || createVariantMutation.isLoading}
				>
					{createVariantMutation.isLoading ? 'Creating...' : 'Create'}
				</Button>
				<Button
					className='btnSecondary'
					type='button'
					onClick={() => {
						handleResetForm()
						router.back()
					}}
				>
					Cancel
				</Button>
			</div>
		</form>
	)
}
