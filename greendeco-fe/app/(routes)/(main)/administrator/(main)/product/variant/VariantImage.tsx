import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/app/_api/axios/media'
import { IMAGE_MAX_SIZE_IN_MB } from '@/app/_configs/constants/variables'
import React, { Dispatch, SetStateAction } from 'react'
import { EMPTY_STRING } from '@/app/_configs/constants/variables'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'

type VariantImageProps = {
	image: string | undefined
	setImage?: Dispatch<SetStateAction<string | undefined>>
}

export default function VariantImage({ image, setImage }: VariantImageProps) {
	return (
		<div className=' h-[300px] w-full'>
			<ImageUploadItem
				image={image ? image : EMPTY_STRING}
				setImage={setImage}
			/>
		</div>
	)
}
//NOTE: useMutation causes a lot of re-rendering, so it is better to seperate the
//image display and the upload input to minimize re-rendering for
//ImageUploadItem
const ImageUploadItem = React.memo(function ImageUploadInput({
	image,
	setImage,
}: VariantImageProps) {
	return (
		<div className=' relative aspect-square h-full overflow-hidden rounded-[4px] border-[4px] border-primary-625-20 hover:border-primary-625'>
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
			{setImage && <UploadInput setImage={setImage} />}
		</div>
	)
})

const UploadInput = React.memo(function UploadInput({
	setImage,
}: {
	setImage: Dispatch<SetStateAction<string | undefined>>
}) {
	const imageUploadMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: uploadImage,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			setImage(data)
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
				htmlFor={`variant-upload`}
				className='absolute inset-0 cursor-pointer'
			></label>
			<input
				className='hidden'
				type='file'
				id={`variant-upload`}
				accept='image/*'
				onChange={onFileChange}
			/>
		</>
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
