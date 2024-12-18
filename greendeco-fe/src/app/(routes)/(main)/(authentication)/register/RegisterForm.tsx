'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, RegisterFormInputType } from '@/src/configs/schemas/authentication'
import { TextField } from '@/src/components/form'
import Button from '@/src/components/Button'
import { useRouter } from 'next/navigation'
import { useRegisterMutation } from '@/src/queries/auth'
import { toast } from 'react-toastify'
import path from '@/src/constants/path'
import { handleErrorApi } from '@/src/utils/utils'

export default function RegisterForm() {
  const router = useRouter()
  const defaultInputValues: RegisterFormInputType = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: ''
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<RegisterFormInputType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(RegisterSchema),
    defaultValues: defaultInputValues
  })

  const registerMutation = useRegisterMutation()

  const onSubmitHandler: SubmitHandler<RegisterFormInputType> = async (values) => {
    if (registerMutation.isLoading) return
    try {
      const res = await registerMutation.mutateAsync({
        ...values,
        identifier: values.email
      })
      reset()
      toast.success(res.data.message)
      router.push(path.login)
    } catch (error) {
      handleErrorApi({ error, setError })
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='flex w-full flex-col gap-cozy text-body-sm'
      >
        <div className='flex-row-between gap-cozy'>
          <div className='flex-1'>
            <TextField
              type='text'
              label='First Name'
              placeholder='First Name'
              register={register('firstName')}
              error={Boolean(errors?.firstName)}
              helperText={errors?.firstName?.message}
            />
          </div>
          <div className='flex-1'>
            <TextField
              type='text'
              label='Last Name'
              placeholder='Last Name'
              register={register('lastName')}
              error={Boolean(errors?.lastName)}
              helperText={errors?.lastName?.message}
            />
          </div>
        </div>
        <div>
          <TextField
            type='email'
            label='Email'
            placeholder='Your Email'
            register={register('email')}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
          />
        </div>
        <div>
          <TextField
            type='tel'
            label='Phone Number'
            placeholder='Phone Number'
            register={register('phoneNumber')}
            error={Boolean(errors?.phoneNumber)}
            helperText={errors?.phoneNumber?.message}
          />
        </div>
        <div>
          <TextField
            type='password'
            label='Password'
            placeholder='Password'
            register={register('password')}
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message}
          />
        </div>
        <div>
          <TextField
            type='password'
            label='Confirm Password'
            placeholder='Confirm Password'
            register={register('passwordConfirm')}
            error={Boolean(errors?.passwordConfirm)}
            helperText={errors?.passwordConfirm?.message}
          />
        </div>
        <Button
          type='submit'
          disabled={registerMutation.isLoading}
        >
          {registerMutation.isLoading ? 'Sending...' : 'Sign Up'}
        </Button>
      </form>
    </>
  )
}
