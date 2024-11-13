'use client'
import { TextField, MultilineTextField } from '@/src/app/_components/form'
import Button from '@/src/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VariantSchema, VariantFormInputType } from '@/src/app/_configs/schemas/variantMangement'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/app/_configs/constants/cookies'
import { AxiosError } from 'axios'
import LabelProvider from '@/src/app/_components/form/LabelProvider'
import VariantImage from '../../VariantImage'
import { useState } from 'react'
import { VariantData } from '@/src/app/_api/axios/product'
import { updateVariant } from '@/src/app/_api/axios/admin/product'
import { ADMINISTRATOR_ROUTE, VARIANT_CURRENCY } from '@/src/app/_configs/constants/variables'
import { notifyUpdateVariantSuccess } from '../../../Notifications'
import { useRouter, useSearchParams } from 'next/navigation'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/src/app/_configs/constants/queryKey'

export default function EditVariantForm(variant: VariantData) {
  const queryClient = useQueryClient()
  const productName = useSearchParams().get('productName')?.toString()
  const router = useRouter()

  const [variantImage, setVariantImage] = useState<VariantData['image'] | undefined>(variant.image)
  const defaultInputValues: VariantFormInputType = {
    color: variant.color,
    is_default: false,
    available: variant.available,
    price: variant.price,
    color_name: variant.color_name,
    description: variant.description,
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<VariantFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(VariantSchema),
    defaultValues: defaultInputValues,
  })

  const updateVariantMutation = useMutation({
    //NOTE: The callback used for the mutation
    mutationFn: updateVariant,
    //NOTE: Execuse after receiving suscess responses
    onSuccess: (data) => {
      notifyUpdateVariantSuccess()
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Variant, variant.product],
      })
      router.replace(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${variant.product}`)
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
      updateVariantMutation.mutate({
        variantData: {
          ...restValues,
          id: variant.id,
          product_id: variant.product,
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
    setVariantImage(variant.image)
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
                  className=' size-[40px]'
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
              <span>{errors?.description?.message}</span>
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
          disabled={variantImage === undefined || updateVariantMutation.isLoading || !isDirty}
        >
          {updateVariantMutation.isLoading ? 'Creating...' : 'Save'}
        </Button>
        <Button
          className='btnSecondary'
          type='button'
          onClick={() => {
            handleResetForm()
            router.back()
          }}
          disabled={updateVariantMutation.isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
