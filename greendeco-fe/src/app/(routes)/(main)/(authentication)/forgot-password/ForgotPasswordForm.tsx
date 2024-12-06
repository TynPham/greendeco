'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ForgotPasswordFormInputType,
  ForgotPasswordSchema
} from '@/src/configs/schemas/authentication'
import { TextField } from '@/src/components/form'
import Button from '@/src/components/Button'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { handleErrorApi } from '@/src/utils/utils'
import { useSendEmailToResetPasswordMutation } from '@/src/queries/auth'
import path from '@/src/constants/path'

export default function ForgotPasswordForm() {
  const router = useRouter()
  const defaultInputValues: ForgotPasswordFormInputType = {
    email: ''
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<ForgotPasswordFormInputType>({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: defaultInputValues
  })

  const sendEmailToResetPasswordMutation = useSendEmailToResetPasswordMutation()

  const onSubmitHandler: SubmitHandler<ForgotPasswordFormInputType> = async (values) => {
    if (sendEmailToResetPasswordMutation.isLoading) return
    try {
      const res = await sendEmailToResetPasswordMutation.mutateAsync(values)
      reset()
      toast.success(res.data.message)
      router.push(path.emailSendSuccess)
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
        <Button
          type='submit'
          disabled={sendEmailToResetPasswordMutation.isLoading}
        >
          {sendEmailToResetPasswordMutation.isLoading ? 'Sending...' : 'Send Email'}
        </Button>
      </form>
    </>
  )
}
