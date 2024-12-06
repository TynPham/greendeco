'use client'

import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@/src/components/Button'
import { UserProfileFormInputType, UserProfileSchema } from '@/src/configs/schemas/userProfile'
import UserAvatar from './UserAvatar'
import { useQueryClient } from '@tanstack/react-query'
import { useState, memo } from 'react'
import { notifySuccess } from './Notification'
import { TextField } from '@/src/components/form'
import { User } from '@/src/types/user.type'
import { useAppContext } from '@/src/configs/store/useAppContext'
import { useUpdateUserProfileMutation } from '@/src/queries/user'
import { handleErrorApi } from '@/src/utils/utils'

function UserProfileForm({ profile }: { profile: User }) {
  const { avatar, firstName, lastName, email, phoneNumber } = profile
  const [userAvatar, setUserAvatar] = useState(avatar)
  const { setUser } = useAppContext()

  const queryClient = useQueryClient()

  const defaultInputValues: UserProfileFormInputType = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setError
  } = useForm<UserProfileFormInputType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    resolver: zodResolver(UserProfileSchema),
    defaultValues: defaultInputValues
  })

  const updateUserProfileMutation = useUpdateUserProfileMutation()

  const onSubmitHandler: SubmitHandler<UserProfileFormInputType> = async (values) => {
    if (updateUserProfileMutation.isLoading) return
    try {
      const res = await updateUserProfileMutation.mutateAsync({
        avatar: userAvatar,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber
      })

      reset(res.data)
      notifySuccess()
      setUser(res.data)
    } catch (error) {
      handleErrorApi({ error, setError: setError })
    }
  }
  return (
    <div className='flex-col-start gap-comfortable'>
      <UserAvatar
        avatar={userAvatar}
        setAvatar={setUserAvatar}
      />
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className='flex w-full flex-col gap-cozy text-body-sm'
      >
        <div className='flex-row-between gap-cozy'>
          <div className='flex-1'>
            <TextField
              type='text'
              label='First name'
              placeholder='First name'
              register={register('firstName')}
              error={Boolean(errors?.firstName)}
              helperText={errors?.lastName?.message}
            />
          </div>
          <div className='flex-1'>
            <TextField
              type='text'
              label='Last name'
              placeholder='Last name'
              register={register('lastName')}
              error={Boolean(errors?.lastName)}
              helperText={errors?.lastName?.message}
            />
          </div>
        </div>
        <div>
          <TextField
            type='email'
            label='Email'
            placeholder='Email'
            register={register('email')}
            error={Boolean(errors?.email)}
            helperText={errors?.email?.message}
          />
        </div>
        <div>
          <TextField
            type='tel'
            label='Phone number'
            placeholder='Phone number'
            register={register('phoneNumber')}
            error={Boolean(errors?.phoneNumber)}
            helperText={errors?.phoneNumber?.message}
          />
        </div>
        <span className='flex gap-cozy'>
          <Button
            className='w-fit px-comfortable'
            disabled={
              (!isDirty && userAvatar == profile.avatar) || updateUserProfileMutation.isLoading
            }
            type='submit'
          >
            Edit
          </Button>

          <Button
            className='btnSecondary w-fit px-comfortable'
            disabled={(!isDirty && avatar == profile.avatar) || updateUserProfileMutation.isLoading}
            type='button'
            onClick={() => {
              reset()
              setUserAvatar(profile.avatar)
            }}
          >
            Cancel
          </Button>
        </span>
      </form>
    </div>
  )
}
export default memo(UserProfileForm)
