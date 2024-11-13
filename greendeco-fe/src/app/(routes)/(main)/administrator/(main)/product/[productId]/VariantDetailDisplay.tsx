import { VariantData } from '@/src/app/_api/axios/product'
import LabelProvider from '@/src/app/_components/form/LabelProvider'
import formatDate from '@/src/app/_hooks/useFormatDate'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'

export default function VariantDetailDisplay({ variant }: { variant: VariantData }) {
  return (
    <div className='grid  grid-cols-3 gap-comfortable'>
      <VariantImage image={variant.image} />
      <Detail {...variant} />
      <Dates {...variant} />
    </div>
  )
}

function VariantImage({ image }: { image: VariantData['image'] }) {
  return (
    <div className='relative aspect-square h-fit overflow-hidden rounded-[4px] border border-primary-625-20 '>
      <Image
        fill
        style={{ objectFit: 'contain' }}
        src={image}
        alt='variant image'
      ></Image>
    </div>
  )
}

function Detail({ description, color_name, name, price, currency, available, color }: VariantData) {
  return (
    <div className='flex-col-start gap-cozy'>
      <LabelProvider
        label='Name:'
        className='gap-[4px] text-body-sm'
        direction='vertical'
      >
        <span className='text-body-md'>{name}</span>
      </LabelProvider>
      <LabelProvider
        label='Description:'
        className='gap-[4px] text-body-sm'
        direction='vertical'
      >
        <span className='text-body-md'>{description}</span>
      </LabelProvider>
      <LabelProvider
        label='Pot Color:'
        className=' text-body-sm'
        direction='vertical'
      >
        <span className='flex items-center gap-compact'>
          <span className='text-body-md capitalize'>{color_name}</span>
          <span
            className='aspect-square h-[40px] rounded-[100%]'
            style={{ backgroundColor: color }}
          />
        </span>
      </LabelProvider>
      <LabelProvider
        label='Price:'
        className='gap-[4px] text-body-sm'
        direction='vertical'
      >
        <span className='text-body-md'>
          {price} {currency}
        </span>
      </LabelProvider>

      <span
        className={clsx(
          'flex w-fit items-center gap-compact rounded-[8px]  p-cozy text-body-lg font-semi-bold text-white',
          {
            'bg-action-link text-white': available,
            'bg-neutral-gray-6 text-white': !available,
          },
        )}
      >
        Available <CheckBadgeIcon className='aspect-square h-[24px]' />
      </span>
    </div>
  )
}

function Dates({ created_at, updated_at }: VariantData) {
  return (
    <div className='flex-col-start gap-cozy'>
      <LabelProvider
        label='Date Created:'
        className='gap-[4px] text-body-sm'
        direction='vertical'
      >
        <span className='text-body-md'>{formatDate(new Date(created_at))}</span>
      </LabelProvider>
      <LabelProvider
        label='Last updated:'
        className='gap-[4px] text-body-sm'
        direction='vertical'
      >
        <span className='text-body-md'>{formatDate(new Date(updated_at))}</span>
      </LabelProvider>
    </div>
  )
}
