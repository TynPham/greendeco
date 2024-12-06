'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ResetPasswordFormInputType,
  ResetPasswordSchema
} from '@/src/configs/schemas/authentication'
import { TextField } from '@/src/components/form'
import Button from '@/src/components/Button'
import { useRouter } from 'next/navigation'
import { handleErrorApi } from '@/src/utils/utils'
import { toast } from 'react-toastify'
import { useResetPasswordMutation } from '@/src/queries/auth'
import path from '@/src/constants/path'

export default function ResetPasswordForm({ resetPasswordToken }: { resetPasswordToken: string }) {
  const router = useRouter()
  const defaultInputValues: ResetPasswordFormInputType = {
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
  } = useForm<ResetPasswordFormInputType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: defaultInputValues
  })

  const resetPasswordMutation = useResetPasswordMutation()

  const onSubmitHandler: SubmitHandler<ResetPasswordFormInputType> = async (values) => {
    if (resetPasswordMutation.isLoading) return
    try {
      const res = await resetPasswordMutation.mutateAsync(values)
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
        <TextField
          type='password'
          label='New Password'
          placeholder='Your new password'
          register={register('password')}
          error={Boolean(errors?.password)}
          helperText={errors?.password?.message}
        />
        <TextField
          type='password'
          label='Confirm New Password'
          placeholder='Confirm your new password'
          register={register('passwordConfirm')}
          error={Boolean(errors?.passwordConfirm)}
          helperText={errors?.passwordConfirm?.message}
        />
        <Button
          type='submit'
          disabled={resetPasswordMutation.isLoading}
        >
          {resetPasswordMutation.isLoading ? 'Sending...' : 'Reset Password'}
        </Button>
      </form>
    </>
  )
}
