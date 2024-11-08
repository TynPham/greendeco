'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ForgotPasswordFormInputType,
  ForgotPasswordSchema,
} from '@/src/app/_configs/schemas/authentication'
import { useMutation } from '@tanstack/react-query'
import { sendEmailToResetPassword } from '@/src/app/_api/axios/authentication'
import { AxiosError } from 'axios'
import { notifySendEmailFail } from '../Notification'
import { TextField } from '@/src/app/_components/form'
import Button from '@/src/app/_components/Button'
import { useRouter } from 'next/navigation'
import { AUTHENTICATION_ROUTE } from '@/src/app/_configs/constants/variables'

export default function ForgotPasswordForm() {
  const router = useRouter()
  const defaultInputValues: ForgotPasswordFormInputType = {
    email: '',
  }

  //NOTE: Validation with useForm
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: defaultInputValues,
  })

  const forgotPasswordMutation = useMutation({
    //NOTE: The callback used for the mutation
    mutationFn: sendEmailToResetPassword,
    //NOTE: Execuse after receiving suscess responses
    onSuccess: () => {
      reset()
      router.replace(AUTHENTICATION_ROUTE.EMAIL_SEND_SUCCESS.LINK)
    },
    //NOTE: Execuse after receving failure responses
    onError: (e) => {
      if (e instanceof AxiosError) {
        notifySendEmailFail(e.response?.data.msg || e.message)
      }
    },
  })

  const onSubmitHandler: SubmitHandler<ForgotPasswordFormInputType> = (value, e) => {
    e?.preventDefault()
    //NOTE: Execute the Mutation
    forgotPasswordMutation.mutate({ email: value.email })
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
          disabled={forgotPasswordMutation.isLoading}
        >
          {forgotPasswordMutation.isLoading ? 'Sending...' : 'Send Email'}
        </Button>
      </form>
    </>
  )
}
