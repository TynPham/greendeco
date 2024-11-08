'use client'
import { TextField, MultilineTextField } from '@/src/app/_components/form'
import Button from '@/src/app/_components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  UpdateProductDetailSchema,
  UpdateProductDetailFormInputType,
} from '@/src/app/_configs/schemas/updateProduct'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  SIZE_OPTIONS,
  TYPE_OPTIONS,
  DIFFICULTY_OPTIONS,
  ADMINISTRATOR_ROUTE,
} from '@/src/app/_configs/constants/variables'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/src/app/_configs/constants/cookies'
import { updateProduct } from '@/src/app/_api/axios/admin/product'
import { ProductData } from '@/src/app/_api/axios/product'
import EditImagesGrid from './EditImagesGrid'
import { useContext } from 'react'
import { useStore } from 'zustand'
import { EditImagesContext } from '@/src/app/_configs/store/useEditImageStore'
import LabelProvider from '@/src/app/_components/form/LabelProvider'
import { notifyUpdateProductSuccess } from '../../Notifications'
import { useRouter } from 'next/navigation'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/src/app/_configs/constants/queryKey'

export default function ProductEditForm(product: ProductData) {
  const router = useRouter()

  const queryClient = useQueryClient()
  const imagesStore = useContext(EditImagesContext)
  if (!imagesStore) throw new Error('Missing EditImageContext.Provider in the tree')
  const images = useStore(imagesStore, (state) => state.images)

  const defaultInputValues: UpdateProductDetailFormInputType = {
    size: product.size,
    available: product.available,
    is_publish: product.is_publish,
    type: product.type,
    light: product.light,
    water: product.water,
    difficulty: product.difficulty,
    detail: product.detail,
    description: product.description,
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateProductDetailFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(UpdateProductDetailSchema),
    defaultValues: defaultInputValues,
  })

  const updateProductMutation = useMutation({
    //NOTE: The callback used for the mutation
    mutationFn: updateProduct,
    //NOTE: Execuse after receiving suscess responses
    onSuccess: (data) => {
      handleResetForm()
      notifyUpdateProductSuccess()
      queryClient.invalidateQueries({
        queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Product, product.id],
      })
      router.replace(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/${product.id}`)
    },
    //NOTE: Execuse after receving failure responses
    /* onError: (e) => {
			if (e instanceof AxiosError) {
			}
		}, */
  })

  const onSubmitHandler: SubmitHandler<UpdateProductDetailFormInputType> = (values, e) => {
    e?.preventDefault()

    const adminAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
    updateProductMutation.mutate({
      productData: { id: product.id, ...values, images: [...images] },
      adminAccessToken: adminAccessToken,
    })
  }
  const handleResetForm = () => {
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
            <div>
              <LabelProvider label='Published'>
                <input
                  aria-label='set-product-publish'
                  type='checkbox'
                  className='h-full'
                  disabled={product.is_publish}
                  placeholder='Published'
                  {...register('is_publish')}
                />
              </LabelProvider>
            </div>
            <div>
              <LabelProvider label='Avaiable'>
                <input
                  aria-label='set-product-available'
                  type='checkbox'
                  placeholder='Product Available'
                  {...register('available')}
                />
              </LabelProvider>
            </div>
          </div>
        </>
        <LabelProvider
          className='text-body-md'
          label='Product Images'
          direction='vertical'
        >
          <EditImagesGrid images={images} />
        </LabelProvider>
      </div>
      <div className='mt-cozy flex w-full justify-end gap-cozy'>
        <Button
          type='submit'
          disabled={updateProductMutation.isLoading || !isDirty}
        >
          {updateProductMutation.isLoading ? 'Saving...' : 'Save'}
        </Button>
        <Button
          className='btnSecondary'
          type='button'
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
