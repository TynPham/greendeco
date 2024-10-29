'use client'
import Link from 'next/link'
import ResetPasswordForm from './ResetPasswordForm'
import { useSearchParams } from 'next/navigation'

export default function ResetPasswordPage() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	if (token == null) {
		return <MissingTokenMessage />
	}
	return (
		<>
			<div className='flex-col-start h-full justify-center gap-common'>
				<div>
					<div className='flex-col-start gap-[4px]'>
						<h1>Reset Password</h1>
						<p className='text-body-md'>Enter your new password.</p>
					</div>
				</div>
				<ResetPasswordForm resetPasswordToken={token} />
			</div>
		</>
	)
}

function MissingTokenMessage() {
	return (
		<>
			<div className='flex-col-start h-full justify-center gap-cozy'>
				<div className='flex-col-start gap-[4px]'>
					<h1>Can&apos;t Reset Your Password</h1>
					<p className='text-body-md'>
						Seems like you haven&apos;t sent your registered email to us.
					</p>
				</div>
				<div className='flex-col-start gap-[4px] text-body-md'>
					<p>
						In order to reset your account password, you need to{' '}
						<Link
							replace
							href={'/forgot-password'}
						>
							send your registered email
						</Link>{' '}
						to us.
					</p>
					<p>
						Or if you don&apos;t have an account,{' '}
						<Link
							replace
							href={'/register'}
						>
							Sign Up Now!
						</Link>
					</p>
				</div>
			</div>
		</>
	)
}
