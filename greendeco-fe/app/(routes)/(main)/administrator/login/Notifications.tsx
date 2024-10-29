import React from 'react'
import { toast, ToastOptions } from 'react-toastify'
import Link from 'next/link'

export const notifyLoginSuccess = () => {
	toast.success(<LoginSuccessMessage />, {
		position: 'top-center',
	})
}
export const notifyLoginFail = (errorMessage?: string) => {
	toast.error(<LoginErrorMessage message={errorMessage ? errorMessage : undefined} />, {
		position: 'top-center',
	})
}

const LoginSuccessMessage = () => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-primary-625'>Successfully Logged In</h3>
	</div>
)

const LoginErrorMessage = ({ message }: { message?: string }) => (
	<div className='flex flex-col gap-[4px] pl-compact pr-common text-body-sm'>
		<h3 className='capitalize text-status-error'>{message ? message : 'Login Failed'}</h3>
	</div>
)
