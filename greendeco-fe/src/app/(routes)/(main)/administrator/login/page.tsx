import Link from 'next/link'
import AdminLoginForm from './AdminLoginForm'
import BrandLogoFullGreen from '@/public/BrandLogoFullGreen.svg'
import Image from 'next/image'

export default function RegisterPage() {
  return (
    <div className='flex w-[50%] items-center justify-center'>
      <div className='flex h-full w-full flex-col justify-center gap-comfortable rounded-[8px] bg-white p-comfortable shadow-15'>
        <div className='border-b-[1px] border-primary-625-60 py-cozy'>
          <div className='relative inline-block h-full w-[180px] overflow-hidden'>
            <Image
              src={BrandLogoFullGreen}
              alt='Welcome to GreenDeco'
              width={0}
              height={0}
              sizes='100vw'
            />
          </div>
          <h1 className='font-medium text-primary-625'>Administration</h1>
        </div>
        <div className='flex-col-start gap-cozy'>
          <h2 className=''>Login</h2>
          <AdminLoginForm />
        </div>
      </div>
    </div>
  )
}
