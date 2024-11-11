import { SHOP_ROUTE } from '@/src/app/_configs/constants/variables'
import Link from 'next/link'
import Image from 'next/image'
import HeroImage from '@/src/app/_assets/images/homepage/hero.png'
import PlantIcon from '@/src/app/_assets/images/homepage/plant.svg'

const HeroStats = () => (
  <div className='z-20 rounded-[16px] border-[3px] border-primary-625 bg-neutral-gray-1 p-cozy shadow-26 md:absolute md:-left-40 md:bottom-52'>
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
    <section className='w-full bg-primary-5555-20/40 pb-32 pt-60 md:h-screen lg:pb-60'>
      <div className='container h-full px-10 2xl:px-40'>
        <div className='grid h-full grid-cols-6 gap-16'>
          <div className='col-span-6 flex items-center justify-center md:col-span-3 xl:col-span-4'>
            <HeroContent />
          </div>

          <div className='relative col-span-6 md:col-span-3 xl:col-span-2'>
            <HeroStats />
            <div className='hidden h-full w-full items-end bg-primary-5555 md:flex'>
              <div className='relative h-full w-full'>
                <Image
                  src={HeroImage}
                  alt='Decorative plants showcase'
                  fill
                  className='object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
