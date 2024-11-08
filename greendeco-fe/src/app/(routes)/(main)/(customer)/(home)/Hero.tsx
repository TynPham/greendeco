import { SHOP_ROUTE } from '@/src/app/_configs/constants/variables'
import Link from 'next/link'
import Image from 'next/image'
import HeroImage from '@/src/app/_assets/images/homepage/hero.png'
import PlantIcon from '@/src/app/_assets/images/homepage/plant.svg'

const HeroStats = () => (
  <div className='absolute bottom-[24%] left-0 z-20 max-w-[60%] rounded-[16px] border-[3px] border-primary-625 bg-neutral-gray-1 p-cozy shadow-26'>
    <div className='flex items-center gap-cozy'>
      <div className='relative aspect-square h-[70px] rounded-[100%] bg-primary-5555'>
        <Image
          src={PlantIcon}
          alt='Plant icon'
          className='p-[12px]'
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className='flex-col-start'>
        <span className='text-heading-1 font-bold text-primary-418'>+100</span>
        <p className='text-body-md font-semi-bold capitalize text-primary-418-60'>
          Greenery Waiting to be your friend
        </p>
      </div>
    </div>
  </div>
)

const HeroContent = () => (
  <div className='flex-col-start gap-cozy'>
    <h1 className='text-heading-3 font-semi-bold uppercase text-primary-418-80 lg:text-heading-1'>
      Welcome to GreenDeco
    </h1>
    <p className='text-[3.5rem] font-bold capitalize text-primary-5555 lg:text-[4.4rem]'>
      A beautiful plant is like having a friend around the house
    </p>
    <Link
      href={SHOP_ROUTE.SHOP_LIST.LINK}
      className='btn w-fit px-comfortable'
    >
      Shop now
    </Link>
  </div>
)

export default function Hero() {
  return (
    <section className='w-full bg-primary-5555-20/40 py-60 md:h-screen'>
      <div className='container h-full'>
        <div className='grid h-full grid-cols-12'>
          <div className='col-span-12 flex items-center justify-center px-comfortable md:col-span-6 lg:col-span-7'>
            <HeroContent />
          </div>

          <div className='relative hidden pl-[40px] md:col-span-6 md:block lg:col-span-5'>
            <HeroStats />
            <div className='flex h-full w-full items-end bg-primary-5555'>
              <div className='relative h-full w-full'>
                <Image
                  src={HeroImage}
                  alt='Decorative plants showcase'
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
