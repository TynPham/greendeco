import Link from 'next/link'
import Image from 'next/image'
import BoxHeart from '@/src/assets/images/boxheartgreen.svg'
import BrandLogoFullWhite from '@/public/BrandLogoFullWhite.svg'
import {
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/solid'
import { USER_SETTING_ROUTE } from '@/src/configs/constants/variables'
export default function PaymentPage() {
  return (
    <div className='flex-center container h-full'>
      <div className='flex-col-start size-full items-center justify-center gap-comfortable'>
        <div className='flex-col-start w-full items-center gap-cozy'>
          <ExclamationTriangleIcon className='aspect-square h-[200px]  text-neutral-gray-1'></ExclamationTriangleIcon>
          <div className='text-center text-neutral-gray-1'>
            <h1 className=' text-[4rem] capitalize'>Payment unsuccessful</h1>
            <span className='text-heading'>
              Don&apos;t worry, you can retry later in your order detail
            </span>
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
