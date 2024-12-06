import Link from 'next/link'
import ForgotPasswordForm from './ForgotPasswordForm'
import { AUTHENTICATION_ROUTE } from '@/src/configs/constants/variables'

export default function RegisterPage() {
  return (
    <>
      <div className='flex-col-start h-full justify-center gap-common'>
        <div>
          <div className='flex-col-start gap-[4px]'>
            <h1>Forgot Password</h1>
            <p className='text-body-md'>
              To gain access and reset your password, enter your registered email.
            </p>
          </div>
        </div>
        <ForgotPasswordForm />
        <span className='text-center text-body-md'>
          Don&apos;t have an account?{' '}
          <Link
            replace
            href={AUTHENTICATION_ROUTE.REGISTER.LINK}
          >
            Sign Up Now!
          </Link>
        </span>
      </div>
    </>
  )
}
