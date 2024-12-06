'use client'
import { TextField } from '@/src/components/form'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/src/components/Button'
import { LoginFormInputType, LoginSchema } from '@/src/configs/schemas/authentication'
import { notifyLoginFail, notifyLoginSuccess } from './Notifications'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useLoginAdminMutation } from '@/src/queries/auth'
import path from '@/src/constants/path'
import { useAppContext } from '@/src/configs/store/useAppContext'

export default function AdminLoginForm() {
  const router = useRouter()
  const { setUser } = useAppContext()
  const defaultInputValues: LoginFormInputType = {
    email: '',
    password: ''
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultInputValues
  })

  const loginAdminMutation = useLoginAdminMutation()

  const onSubmitHandler: SubmitHandler<LoginFormInputType> = async (values) => {
    if (loginAdminMutation.isLoading) return
    try {
      const res = await loginAdminMutation.mutateAsync(values)
      reset()
      setUser(res.data.user)
      notifyLoginSuccess()
      router.push(path.productAdministrator)
    } catch (error) {
      if (error instanceof AxiosError) {
        notifyLoginFail(error.response?.data.msg)
      } else {
        notifyLoginFail('Something went wrong')
      }
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='flex w-full flex-col gap-cozy text-body-sm'
      >
        <div>
          <TextField
            type='email'
            label='Email'
            placeholder='Administrator Email'
            register={register('email')}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
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
        <Button
          type='submit'
          disabled={loginAdminMutation.isLoading}
        >
          {loginAdminMutation.isLoading ? 'Sending...' : 'Login'}
        </Button>
      </form>
    </>
  )
}
