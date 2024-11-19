'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TextField } from '@/src/app/_components/form'
import Button from '@/src/app/_components/Button'
import { ProductSearchFormInputType, ProductSearchSchema } from '@/src/app/_configs/schemas/search'
import useQueryParams from '@/src/app/_hooks/useQueryParams'
import { MIN_SEARCH_VALUE, SHOP_ROUTE } from '@/src/app/_configs/constants/variables'

type QueryParams = {
  field: string | null
}

export default function ProductSearchForm() {
  const { directToPathWithQueryParams } = useQueryParams<QueryParams>()
  const defaultInputValues: ProductSearchFormInputType = {
    search: ''
  }

  //NOTE: Validation with useForm
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid }
  } = useForm<ProductSearchFormInputType>({
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ProductSearchSchema),
    defaultValues: defaultInputValues
  })

  const onSubmitHandler: SubmitHandler<ProductSearchFormInputType> = (value, e) => {
    e?.preventDefault()
    //NOTE: Execute the Mutation
    directToPathWithQueryParams(
      { field: JSON.stringify({ name: value.search }) },
      SHOP_ROUTE.SEARCH.LINK
    )
  }
  return (
    <div className='flex-col-start w-full items-center justify-center gap-compact p-cozy'>
      <span className='text-body-md font-semi-bold text-primary-5555'>
        What do you have in mind?
      </span>
      <div className='flex-col-start w-full gap-[4px]'>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className='flex w-full flex-wrap items-center gap-cozy text-body-sm'
        >
          <TextField
            className='flex-1 text-body-lg'
            type='text'
            placeholder='Search here'
            register={register('search')}
            error={false}
          />
          <Button
            disabled={!isDirty || !isValid}
            type='submit'
            className='w-full rounded-[8px] px-comfortable font-semi-bold sm:w-fit'
          >
            Search
          </Button>
        </form>
        <p className='text-body-xsm italic text-primary-418-60'>
          * Must contain at least {MIN_SEARCH_VALUE} characters and ONLY characters
        </p>
      </div>
    </div>
  )
}
