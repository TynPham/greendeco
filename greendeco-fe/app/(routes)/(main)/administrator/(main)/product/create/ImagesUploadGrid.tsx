'use client'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/app/_api/axios/media'
import { IMAGE_MAX_SIZE_IN_MB } from '@/app/_configs/constants/variables'
import React, { Dispatch, useEffect, useState } from 'react'
import { EMPTY_STRING } from '@/app/_configs/constants/variables'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useImageUploadStore } from '@/app/_configs/store/useImagesUploadStore'

function ImageUploadGrid() {
	const { images } = useImageUploadStore()

	return (
		<div className='grid grid-cols-3 gap-compact'>
			{images.map((image, index) => (
				<ImageUploadItem
					key={index}
					image={image}
					index={index}
				/>
			))}
		</div>
	)
}

const UploadInput = React.memo(function UploadInput({ index }: { index: number }) {
	const { replaceImages } = useImageUploadStore()
	const imageUploadMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: uploadImage,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			replaceImages(data, index)
		},
	})

	function handleImageChange(imageFile: File) {
		validateImageSize(imageFile).then(() => {
			const formData = new FormData()
			formData.append('image', imageFile)

			imageUploadMutation.mutate(formData)
		})
	}

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.files && handleImageChange(event.target.files[0])
	}
	return (
		<>
			<label
				htmlFor={`product-upload-${index}`}
				className='absolute inset-0 cursor-pointer'
			></label>
			<input
				className='hidden'
				type='file'
				id={`product-upload-${index}`}
				accept='image/*'
				onChange={onFileChange}
			/>
		</>
	)
})

//NOTE: useMutation causes a lot of re-rendering, so it is better to seperate the
//image display and the upload input to minimize re-rendering for
//ImageUploadItem

const ImageUploadItem = React.memo(function ImageUploadInput({
	image,
	index,
}: {
	image: string
	index: number
}) {
	return (
		<div className=' relative aspect-square overflow-hidden rounded-[4px] border-[4px] border-primary-625-20 hover:border-primary-625'>
			{image && image !== EMPTY_STRING ? (
				<Image
					width={0}
					height={0}
					sizes='100vw'
					src={image}
					alt='product image'
				></Image>
			) : (
				<span className='flex-center h-full w-full bg-neutral-gray-4'>
					<PhotoIcon className='aspect-square h-[30px]' />
				</span>
			)}
			<UploadInput index={index} />
		</div>
	)
})

function validateImageSize(image: File) {
	const maxSize = IMAGE_MAX_SIZE_IN_MB * 1000 * 1024

	return new Promise((resolve, rejects) => {
		if (image.size < maxSize) {
			resolve(image)
		} else rejects(`Image size must be lower than ${IMAGE_MAX_SIZE_IN_MB} MB`)
	})
}

export default React.memo(ImageUploadGrid)
