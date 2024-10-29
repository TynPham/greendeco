import React, { Dispatch } from 'react'
import Image from 'next/image'
import { AxiosError } from 'axios'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import { useMutation } from '@tanstack/react-query'
import { uploadImage } from '@/app/_api/axios/media'
import { UserProfileResponseData } from '@/app/_api/axios/user'
import { IMAGE_MAX_SIZE_IN_MB } from '@/app/_configs/constants/variables'
import { notifyError } from './Notification'
import Button from '@/app/_components/Button'
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/solid'
import { MutatingDots } from 'react-loader-spinner'

function UserAvatar({
	avatar,
	setAvatar,
}: {
	avatar: UserProfileResponseData['avatar']
	setAvatar: Dispatch<UserProfileResponseData['avatar']>
}) {
	const imageUploadMutation = useMutation({
		//NOTE: The callback used for the mutation
		mutationFn: uploadImage,
		//NOTE: Execuse after receiving suscess responses
		onSuccess: (data) => {
			setAvatar(data)
		},
		//NOTE: Execuse after receving failure responses
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyError(e.response?.data.msg)
			}
		},
	})

	function handleImageChange(imageFile: File) {
		validateImageSize(imageFile)
			.then(() => {
				const formData = new FormData()
				formData.append('image', imageFile)

				imageUploadMutation.mutate(formData)
			})
			.catch((error) => notifyError(error))
	}

	const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.target.files && handleImageChange(event.target.files[0])
	}

	return (
		<div className='flex gap-comfortable'>
			<div className='relative flex aspect-square w-[180px] items-center justify-center overflow-hidden rounded-[100%] border-[1px] border-primary-418-20'>
				{imageUploadMutation.isLoading && <LoadingAvatar />}
				<Image
					width={0}
					height={0}
					sizes='100vw'
					src={avatar ? avatar : DEFAULT_AVATAR}
					alt='user avatar'
				></Image>
			</div>
			<div className='flex flex-col justify-center gap-cozy'>
				<SelectImageButton handleFileChange={onFileChange} />

				<Button
					onClick={() => setAvatar(null)}
					className='btnSecondary flex items-center justify-center gap-compact px-cozy'
				>
					<TrashIcon className='aspect-square w-[20px]' />
					Remove
				</Button>
			</div>
		</div>
	)
}

function SelectImageButton({
	handleFileChange,
}: {
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
	return (
		<Button
			type='button'
			className='btnSecondary flex items-center justify-center gap-compact px-cozy'
		>
			<PhotoIcon className='aspect-square w-[20px]' />
			<label
				htmlFor='upload-photo'
				className='cursor-pointer'
			>
				Change Avatar
			</label>
			<input
				className='hidden'
				type='file'
				id='upload-photo'
				accept='image/*'
				onChange={handleFileChange}
			/>
		</Button>
	)
}

function LoadingAvatar() {
	return (
		<div className='absolute inset-0 flex items-center justify-center bg-primary-625'>
			<MutatingDots
				height='100'
				width='100'
				color='#fff'
				secondaryColor='#fff'
				radius='12.5'
				ariaLabel='mutating-dots-loading'
				visible={true}
			/>
		</div>
	)
}

function validateImageSize(image: File) {
	const maxSize = IMAGE_MAX_SIZE_IN_MB * 1000 * 1024

	return new Promise((resolve, rejects) => {
		if (image.size < maxSize) {
			resolve(image)
		} else rejects(`Image size must be lower than ${IMAGE_MAX_SIZE_IN_MB} MB`)
	})
}

export default React.memo(UserAvatar)
