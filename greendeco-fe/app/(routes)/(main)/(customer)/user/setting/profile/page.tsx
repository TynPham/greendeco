'use client'
import { getUserProfile } from '@/app/_api/axios/user'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import UserProfileForm from './UserProfileForm'
import { notifyGetProfileError } from './Notification'
import { useRouter } from 'next/navigation'
import { MutatingDots } from 'react-loader-spinner'
import { useAppContext } from '@/app/_configs/store/useAppContext'

export default function UserProfilePage() {
	const { user } = useAppContext()
	return (
		<div className='flex-col-start gap-compact'>
			<h1 className='text-heading-3'>Account Preference</h1>
			<div className='p-cozy'>{user && <UserProfileForm profile={user} />}</div>
		</div>
	)
}
