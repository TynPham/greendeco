'use client'
import { TextField } from '@/src/components/form'
import Link from 'next/link'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/src/components/Button'
import { LoginFormInputType, LoginSchema } from '@/src/configs/schemas/authentication'
import { notifyLoginSuccess } from '../Notification'
import { useRouter } from 'next/navigation'
import { AUTHENTICATION_ROUTE } from '@/src/configs/constants/variables'
import { useAppContext } from '@/src/configs/store/useAppContext'
import path from '@/src/constants/path'
import { useLoginMutation } from '@/src/queries/auth'
import { handleErrorApi } from '@/src/utils/utils'
import { toast } from 'react-toastify'

export default function LoginForm() {
  const router = useRouter()
  const { setUser } = useAppContext()

  const defaultInputValues: LoginFormInputType = {
    email: '',
    password: ''
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<LoginFormInputType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(LoginSchema),
    defaultValues: defaultInputValues
  })

  const loginMutation = useLoginMutation()

  const onSubmitHandler: SubmitHandler<LoginFormInputType> = async (values) => {
    if (loginMutation.isLoading) return
    try {
      const res = await loginMutation.mutateAsync(values)
      reset()
      setUser(res.data.user)
      toast.success('Login Successfully')
      router.push(path.home)
    } catch (error) {
      handleErrorApi({ error, setError })
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='flex w-full flex-col gap-cozy text-body-sm'
        noValidate
      >
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
            type='password'
            label='Password'
            placeholder='Password'
            register={register('password')}
            error={Boolean(errors?.password)}
            helperText={errors?.password?.message}
          />
        </div>
        <div className='flex w-full justify-end'>
          <Link
            href={AUTHENTICATION_ROUTE.FORGOT_PASSWORD.LINK}
            replace
          >
            Forgot Password
          </Link>
        </div>
        <Button
          type='submit'
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? 'Signing In...' : 'Sign In'}
        </Button>
      </form>
    </>
  )
}
