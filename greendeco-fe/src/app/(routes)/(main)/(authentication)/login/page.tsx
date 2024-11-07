import Link from 'next/link'
import LoginForm from './LoginForm'
import { AUTHENTICATION_ROUTE } from '@/src/app/_configs/constants/variables'

export default function RegisterPage() {
  return (
    <>
      <div className='flex h-full flex-col items-center justify-center gap-common'>
        <div>
          <span className='mb-compact block text-body-lg'>
            Welcome back to <span className=' text-heading-2 font-bold'>GreenDeco</span> 👋
          </span>
          <div className='flex-col-start gap-[4px]'>
            <h1>Login Your Account</h1>
            <p className='text-body-md'>Start shopping by logging in your account!</p>
          </div>
        </div>
        <LoginForm />
        <span className='text-center text-body-md'>
          Don&apos;t have an account?{' '}
          <Link
            replace
            href={AUTHENTICATION_ROUTE.REGISTER.LINK}
          >
            Sign Up!
          </Link>
        </span>
      </div>
    </>
  )
}
