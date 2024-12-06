import { ReactNode } from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SHOP_ROUTE } from '@/src/configs/constants/variables'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export const metadata: Metadata = {
  title: 'Create An Account',
  description: 'Be a member by creating an account'
}
export default function AuthenticationLayout({ children }: { children: ReactNode }) {
  return (
    <div className='flex-center h-screen w-screen bg-primary-5555-20'>
      <div className='container grid h-full grid-cols-2 overflow-hidden bg-white p-cozy shadow-30'>
        <div className='relative col-span-2 flex h-full flex-col gap-cozy overflow-auto p-4 sm:p-comfortable lg:col-span-1'>
          <Link
            className='flex items-center gap-compact text-body-sm'
            href={'/'}
          >
            <ArrowLeftIcon className='aspect-square h-[16px]' />
            Back to Shopping
          </Link>
          <div className='mx-auto size-full xl:w-[70%]'>{children}</div>
        </div>
        <div className='hidden aspect-auto h-full overflow-hidden rounded-lg lg:col-span-1 lg:block'>
          <Image
            width={0}
            height={0}
            sizes='100vw'
            src='https://static.vecteezy.com/system/resources/previews/018/815/357/original/green-tropical-forest-background-monstera-leaves-palm-leaves-branches-exotic-plants-background-for-banner-template-decor-postcard-abstract-foliage-and-botanical-wallpaper-vector.jpg'
            alt='plants art'
          />
        </div>
      </div>
    </div>
  )
}
