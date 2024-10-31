'use client'
import { TextField } from '@/app/_components/form'
import Link from 'next/link'
import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/app/_components/Button'
import { LoginFormInputType, LoginSchema } from '@/app/_configs/schemas/authentication'
import { loginAccount } from '@/app/_api/axios/authentication'
import { notifyLoginFail, notifyLoginSuccess } from '../Notification'
import { setCookie } from '@/app/_hooks/useCookie'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { useRouter } from 'next/navigation'
import { AUTHENTICATION_ROUTE } from '@/app/_configs/constants/variables'
import { useAppContext } from '@/app/_configs/store/useAppContext'

export default function LoginForm() {
	const queryClient = useQueryClient()
	const router = useRouter()
	const { setUser } = useAppContext()

	const defaultInputValues: LoginFormInputType = {
		email: '',
		password: '',
	}

	//NOTE: Validation with useForm
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormInputType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(LoginSchema),
		defaultValues: defaultInputValues,
	})

	const loginMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: loginAccount,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			reset()
			setCookie({ name: ACCESS_TOKEN_COOKIE_NAME, value: data.access_Token })
			setUser(data.user)
			queryClient.invalidateQueries([UseQueryKeys.User])
			notifyLoginSuccess()
			router.back()
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyLoginFail(e.response?.data.msg)
			}
		},
	})

	const onSubmitHandler: SubmitHandler<LoginFormInputType> = (values, e) => {
		e?.preventDefault()
		//NOTE: Execute the Mutation
		loginMutation.mutate({
			email: values.email,
			password: values.password,
		})
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
