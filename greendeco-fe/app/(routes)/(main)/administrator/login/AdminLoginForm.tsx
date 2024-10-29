'use client'
import { TextField } from '@/app/_components/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/app/_components/Button'
import { LoginFormInputType, LoginSchema } from '@/app/_configs/schemas/authentication'
import { loginAdminAccount } from '@/app/_api/axios/adminAuthentication'
import { notifyLoginFail, notifyLoginSuccess } from './Notifications'
import { setCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { AxiosError } from 'axios'
import { ADMIN_QUERY_KEY } from '@/app/_configs/constants/queryKey'
import { useRouter } from 'next/navigation'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'

export default function AdminLoginForm() {
	const router = useRouter()
	const queryClient = useQueryClient()
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
		mutationFn: loginAdminAccount,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			reset()
			notifyLoginSuccess()
			setCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME, data.access_Token)
			queryClient.invalidateQueries([ADMIN_QUERY_KEY])
			router.replace(ADMINISTRATOR_ROUTE.PRODUCT.LINK)
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyLoginFail()
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
					disabled={loginMutation.isLoading}
				>
					{loginMutation.isLoading ? 'Sending...' : 'Login'}
				</Button>
			</form>
		</>
	)
}
