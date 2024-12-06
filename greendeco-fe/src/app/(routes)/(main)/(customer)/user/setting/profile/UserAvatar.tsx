import React, { Dispatch } from 'react'
import Image from 'next/image'
import { DEFAULT_AVATAR } from '@/src/configs/constants/images'
import { IMAGE_MAX_SIZE_IN_MB } from '@/src/configs/constants/variables'
import Button from '@/src/components/Button'
import { PhotoIcon, TrashIcon } from '@heroicons/react/24/solid'
import { MutatingDots } from 'react-loader-spinner'
import { User } from '@/src/types/user.type'
import { useUploadImageMutation } from '@/src/queries/media'

function UserAvatar({
  avatar,
  setAvatar
}: {
  avatar: User['avatar']
  setAvatar: Dispatch<User['avatar']>
}) {
  const imageUploadMutation = useUploadImageMutation({
    onSuccess: (data) => {
      setAvatar(data)
    }
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
    <div className='flex gap-comfortable'>
      <div className='relative flex aspect-square w-[180px] items-center justify-center overflow-hidden rounded-[100%] border border-primary-418-20'>
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
  handleFileChange
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
