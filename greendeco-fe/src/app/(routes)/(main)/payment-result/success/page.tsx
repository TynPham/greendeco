import Link from 'next/link'
import Image from 'next/image'
import BoxHeart from '@/src/app/_assets/images/boxheartgreen.svg'
import BrandLogoFullWhite from '@/public/BrandLogoFullWhite.svg'
import { ShoppingBagIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/solid'
import { USER_SETTING_ROUTE } from '@/src/app/_configs/constants/variables'
export default function PaymentPage() {
  return (
    <div className='flex-center container h-full'>
      <div className='flex-col-start size-full items-center justify-center gap-comfortable'>
        <div className='flex-col-start w-full items-center gap-cozy'>
          <span className='relative aspect-square h-[200px] rounded-[100%] bg-neutral-gray-1 shadow-18'>
            <Image
              src={BoxHeart}
              fill
              className=' p-comfortable'
              alt='thank you for shopping at GreenDeco'
              style={{ objectFit: 'fill' }}
            ></Image>
          </span>
          <div className='text-neutral-gray-1'>
            <h1 className=' text-[4rem] capitalize '>Payment successful!</h1>
            <p className=' flex w-fit items-center gap-cozy '>
              <span className='text-heading'>Thank you for choosing us</span>
              <span className='text-[3rem]'>🫶 🥰</span>
            </p>
          </div>
        </div>

        <div className='flex-col-start w-1/2 gap-cozy rounded-[16px] bg-neutral-gray-1 p-cozy shadow-38'>
          <div className='flex items-center gap-cozy'>
            <Link
              href={'/'}
              replace
              className='btn flex-1'
            >
              <span className='flex items-center justify-center gap-compact font-semi-bold'>
                <ShoppingBagIcon className='aspect-square h-[24px]' />
                Back to shopping
              </span>
            </Link>
            <Link
              className='btn btnSecondary flex-1'
              replace
              href={USER_SETTING_ROUTE.ORDER.LINK}
            >
              <span className='flex items-center justify-center gap-compact font-semi-bold'>
                View Order List
                <ClipboardDocumentListIcon className='aspect-square h-[24px]' />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <Link
      href={'/'}
      className='relative inline-block h-[40px] w-2/5  overflow-hidden  '
    >
      <Image
        src={BrandLogoFullWhite}
        alt='Welcome to GreenDeco'
        width={0}
        height={0}
        sizes='100vw'
      />
    </Link>
  )
}
