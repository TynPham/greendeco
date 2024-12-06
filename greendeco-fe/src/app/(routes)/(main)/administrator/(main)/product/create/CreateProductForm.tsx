'use client'
import { TextField } from '@/src/components/form'
import Button from '@/src/components/Button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ProductDetailSchema,
  ProductDetailFormInputType
} from '@/src/configs/schemas/createProduct'
import { SIZE_OPTIONS, TYPE_OPTIONS, DIFFICULTY_OPTIONS } from '@/src/configs/constants/variables'
import ImageUploadGrid from './ImagesUploadGrid'
import { useImageUploadStore } from '@/src/configs/store/useImagesUploadStore'
import { MultilineTextField } from '@/src/components/form/MultiplelineTextField'
import LabelProvider from '@/src/components/form/LabelProvider'
import { useRouter } from 'next/navigation'
import { useCreateProductMutation } from '@/src/queries/product'
import path from '@/src/constants/path'
import { toast } from 'react-toastify'
import { handleErrorApi } from '@/src/utils/utils'

export default function CreateProductForm() {
  const router = useRouter()
  const { isFulfilled, images, resetImages } = useImageUploadStore()
  const defaultInputValues: ProductDetailFormInputType = {
    name: '',
    size: SIZE_OPTIONS[0],
    type: TYPE_OPTIONS[0],
    light: '',
    water: '',
    difficulty: DIFFICULTY_OPTIONS[0],
    detail: '',
    description: ''
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ProductDetailFormInputType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(ProductDetailSchema),
    defaultValues: defaultInputValues
  })

  const createProductMutation = useCreateProductMutation()

  const onSubmitHandler: SubmitHandler<ProductDetailFormInputType> = async (values) => {
    if (createProductMutation.isLoading) return

    try {
      const res = await createProductMutation.mutateAsync({ ...values, images: [...images] })
      handleResetForm()
      toast.success('Create product successfully')
      router.push(`${path.productAdministrator}/${res.data.id}`)
    } catch (error) {
      handleErrorApi({ error, setError })
    }
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
