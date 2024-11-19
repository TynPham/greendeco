import Link from 'next/link'
import ShippingDetailForm from './ShippingDetailForm'
import OrderItemList from './OrderList'
import Image from 'next/image'
import BrandLogoFullGreen from '@/public/BrandLogoFullGreen.svg'
import { ArrowLeftIcon } from '@heroicons/react/24/solid'

export default function CheckoutPage() {
  return (
    <div className='grid grid-cols-12 gap-comfortable'>
      <div className='flex-col-start col-span-12 gap-cozy pt-comfortable lg:col-span-7'>
        <Header />
        <ShippingDetailForm />
      </div>

      <div className='col-span-12 h-full max-h-screen py-comfortable lg:col-span-5 '>
        <OrderItemList />
      </div>
    </div>
  )
}

const Header = () => {
  return (
    <div className=' flex items-center justify-between '>
      <div className='flex items-center divide-x divide-primary-625'>
        <Logo />
        <h1 className='pl-compact font-semi-bold text-primary-625'>Checkout</h1>
      </div>
      <Link
        className='text-body-xsm'
        href={'/shop'}
        replace
        scroll
      >
        <span className='flex items-center gap-[4px]'>
          <ArrowLeftIcon className='aspect-square h-[12px]' />
          Continue Shopping
        </span>
      </Link>
    </div>
  )
}

function Logo() {
  return (
    <Link
      href={'/'}
      replace
      scroll
      className='h-full pr-compact'
    >
      <div className='relative inline-block h-[60px] w-[180px] overflow-hidden'>
        <Image
          src={BrandLogoFullGreen}
          alt='Welcome to GreenDeco'
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
    </Link>
  )
}
