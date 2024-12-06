import { useVariantStore } from '@/src/configs/store/useVariantStore'
import { ProductData } from '@/src/types/product.type'
import clsx from 'clsx'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function ImageGallery({ productImages }: { productImages: ProductData['images'] }) {
  const activeVariant = useVariantStore((state) => state.activeVariant)
  const [activeImage, setActiveImage] = useState<string>(activeVariant.image)

  useEffect(() => {
    setActiveImage(activeVariant.image)
  }, [activeVariant])
  return (
    <div className='grid grid-cols-2 gap-cozy'>
      <div className='order-2 col-span-2 flex min-h-[300px] items-center justify-center rounded-[8px] bg-white shadow-18 sm:order-1 sm:col-span-1'>
        <ActiveImage imageUrl={activeImage} />
      </div>
      <div className='order-1 col-span-2 flex h-full items-center justify-center  sm:order-2 sm:col-span-1'>
        <div className='aspect-square'>
          <ImagesGrid
            activeImage={activeImage}
            imageOnClick={setActiveImage}
            imagesList={[activeVariant.image, ...productImages]}
          />
        </div>
      </div>
    </div>
  )
}

function ActiveImage({ imageUrl }: { imageUrl: string }) {
  return (
    <div className='relative size-full overflow-hidden rounded-lg'>
      <Image
        fill
        src={imageUrl}
        alt='plants art'
        className='!object-cover opacity-0 transition-opacity duration-[.5s] sm:!object-contain'
        onLoadingComplete={(image) => image.classList.remove('opacity-0')}
      />
    </div>
  )
}

const ImagesGrid = React.memo(function ImagesGrid({
  activeImage,
  imagesList,
  imageOnClick
}: {
  activeImage: string
  imagesList: string[]
  imageOnClick: (image: string) => void
}) {
  return (
    <div className='grid grid-cols-2 gap-compact'>
      {imagesList.map((image) => (
        <div
          onClick={() => imageOnClick(image)}
          className={clsx(
            'relative aspect-square size-52 cursor-pointer overflow-hidden rounded-[16px] border-[3px] hover:border-primary-5555-40 xl:size-80',
            {
              'pointer-events-none border-primary-5555': image === activeImage,
              'border-transparent': image !== activeImage
            }
          )}
          key={image}
        >
          <Image
            layout='fill'
            src={image}
            alt='plants art'
            className='opacity-0 transition-opacity duration-[.5s]'
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
          />
        </div>
      ))}
    </div>
  )
})
