'use client'
import { TextField, MultilineTextField } from '@/src/components/form'
import Button from '@/src/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { VariantSchema, VariantFormInputType } from '@/src/configs/schemas/variantMangement'
import LabelProvider from '@/src/components/form/LabelProvider'
import VariantImage from '../../VariantImage'
import { useState } from 'react'
import { VARIANT_CURRENCY } from '@/src/configs/constants/variables'
import { notifyUpdateVariantSuccess } from '../../../Notifications'
import { useRouter, useSearchParams } from 'next/navigation'
import { VariantData } from '@/src/types/product.type'
import { useUpdateVariantMutation } from '@/src/queries/product'
import { handleErrorApi } from '@/src/utils/utils'
import path from '@/src/constants/path'
import QuantityController from '@/src/components/QuantityController'

export default function EditVariantForm(variant: VariantData) {
  const productName = useSearchParams().get('productName')?.toString()
  const router = useRouter()
  const [quantity, setQuantity] = useState(variant.quantity || 0)

  const [variantImage, setVariantImage] = useState<VariantData['image'] | undefined>(variant.image)
  const defaultInputValues: VariantFormInputType = {
    color: variant.color,
    is_default: false,
    available: variant.available,
    price: variant.price,
    color_name: variant.color_name,
    description: variant.description,
    quantity: variant.quantity
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError
  } = useForm<VariantFormInputType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(VariantSchema),
    defaultValues: defaultInputValues
  })

  const updateVariantMutation = useUpdateVariantMutation(variant.product)

  const onSubmitHandler: SubmitHandler<VariantFormInputType> = async (values) => {
    if (updateVariantMutation.isLoading) return

    try {
      const { price, color_name, ...restValues } = values
      if (variantImage) {
        await updateVariantMutation.mutate({
          ...restValues,
          id: variant.id,
          product_id: variant.product,
          name: `${productName} ${color_name}`,
          color_name: color_name,
          price: parseInt(price),
          image: variantImage,
          currency: VARIANT_CURRENCY,
          quantity: quantity
        })

        notifyUpdateVariantSuccess()
        router.push(`${path.productAdministrator}/${variant.product}`)
      }
    } catch (error) {
      handleErrorApi({ error, setError })
    }
  }

  const handleResetForm = () => {
    reset()
    setVariantImage(variant.image)
  }
  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler, (error) => {
        console.log(error)
      })}
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
            <div>
              <LabelProvider
                label='Quantity'
                className='items-center'
              >
                <QuantityController
                  quantity={quantity}
                  decrease={() => setQuantity(quantity - 1)}
                  increase={() => setQuantity(quantity + 1)}
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
