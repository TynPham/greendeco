'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ShippingAddressSchema,
  ShippingAddressFormInputType
} from '@/src/configs/schemas/shippingAddress'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { deleteCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { NOT_FOUND_STATUS, UNAUTHORIZE_STATUS } from '@/src/configs/constants/status'
import { TextField } from '@/src/components/form'
import Button from '@/src/components/Button'
import { UseQueryKeys } from '@/src/configs/constants/queryKey'
import { useCreateOrderMutation } from '@/src/queries/order'
import { CreateOrderResponseData } from '@/src/types/order.type'

export default function ShippingDetailForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const defaultInputValues: ShippingAddressFormInputType = {
    city: '',
    district: '',
    ward: '',
    address: ''
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ShippingAddressFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: defaultInputValues
  })

  const handleCreateOrderSuccess = (data: CreateOrderResponseData) => {
    const { id } = data
    reset()
    router.replace(`/payment/${id}`)
    deleteCookie('cartId')
    queryClient.invalidateQueries([UseQueryKeys.User, 'cart'], {
      exact: true
    })
  }

  const createOrderMutation = useCreateOrderMutation({
    onSuccess: handleCreateOrderSuccess,
    onError: (e) => {
      if (e.response?.status === NOT_FOUND_STATUS || e.code === NOT_FOUND_STATUS.toString()) {
        router.back()
      }
    }
  })

  const handleJoiningValues = (values: ShippingAddressFormInputType) => {
    const { city, ward, district, address } = values
    const cityWithLabel = city.toLowerCase().includes('city') ? city : `${city} City`
    const wardWithLabel = ward.toLowerCase().includes('city') ? ward : `${ward} Ward`
    const districtWithLabel = district.toLowerCase().includes('district')
      ? district
      : `District ${district}`
    return `${address}, ${wardWithLabel}, ${districtWithLabel}, ${cityWithLabel}`
  }

  const onSubmitHandler: SubmitHandler<ShippingAddressFormInputType> = (values, e) => {
    e?.preventDefault()
    //NOTE: Execute the Mutation
    const shippingAddress = handleJoiningValues(values)

    console.log(shippingAddress)

    createOrderMutation.mutate({
      shipping_address: shippingAddress
    })
  }
  return (
    <>
      <h2 className='text-body-lg font-semi-bold text-neutral-gray-10'>Delivery Information</h2>
      <div className='flex-col-start gap-cozy rounded-[8px] bg-neutral-gray-1 p-comfortable shadow-38'>
        <form
          onSubmit={handleSubmit(onSubmitHandler)}
          className='flex-col-start gap-cozy'
        >
          <div className='grid grid-cols-2 gap-cozy text-body-sm'>
            <div>
              <TextField
                type='text'
                label='City'
                placeholder='City'
                register={register('city')}
                error={Boolean(errors?.city)}
                helperText={errors?.city?.message}
              />
            </div>
            <div>
              <TextField
                type='text'
                label='District'
                placeholder='District'
                register={register('district')}
                error={Boolean(errors?.district)}
                helperText={errors?.district?.message}
              />
            </div>
            <div>
              <TextField
                type='text'
                label='Ward'
                placeholder='Ward'
                register={register('ward')}
                error={Boolean(errors?.ward)}
                helperText={errors?.ward?.message}
              />
            </div>
            <div>
              <TextField
                type='text'
                label='Address'
                placeholder='Address'
                register={register('address')}
                error={Boolean(errors?.address)}
                helperText={errors?.address?.message}
              />
            </div>
          </div>
          <Button
            type='submit'
            disabled={createOrderMutation.isLoading}
          >
            {createOrderMutation.isLoading ? 'Processing...' : 'Place Order'}
          </Button>
        </form>
      </div>
    </>
  )
}
