import { ProductData, VariantData } from '@/app/_api/axios/product'
import { useVariantStore } from '@/app/_configs/store/useVariantStore'
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
		<div className='grid h-[480px] grid-cols-2 gap-cozy'>
			<div className='flex items-center justify-center rounded-[8px]  bg-white  shadow-18'>
				<ActiveImage imageUrl={activeImage} />
			</div>
			<div className='flex h-full items-center justify-center'>
				<div className='aspect-square h-[75%]'>
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
		<div className='relative h-full w-full'>
			<Image
				fill
				src={imageUrl}
				alt='plants art'
				className='opacity-0 transition-opacity duration-[.5s]'
				onLoadingComplete={(image) => image.classList.remove('opacity-0')}
				style={{ objectFit: 'contain' }}
			/>
		</div>
	)
}

const ImagesGrid = React.memo(function ImagesGrid({
	activeImage,
	imagesList,
	imageOnClick,
}: {
	activeImage: string
	imagesList: string[]
	imageOnClick: (image: string) => void
}) {
	return (
		<div className='grid grid-cols-2 gap-compact'>
			{imagesList.map((image) => (
				<span
					onClick={() => imageOnClick(image)}
					className={clsx(
						'relative aspect-square h-full cursor-pointer overflow-hidden rounded-[16px] border-[3px] hover:border-primary-5555-40',
						{
							'pointer-events-none border-primary-5555': image === activeImage,
							'border-transparent': image !== activeImage,
						},
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
				</span>
			))}
		</div>
	)
})
