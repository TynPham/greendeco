'use client'
import { getUserProfile } from '@/app/_api/axios/user'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import UserProfileForm from './UserProfileForm'
import { notifyGetProfileError } from './Notification'
import { useRouter } from 'next/navigation'
import { MutatingDots } from 'react-loader-spinner'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'

export default function UserProfilePage() {
	const router = useRouter()

	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	const userProfileQuery = useQuery({
		queryKey: ['user'],
		queryFn: () => getUserProfile(accessToken),
		onError: (e) => {
			if (e instanceof AxiosError) {
				notifyGetProfileError(e.response?.data.msg, {
					onClose: () => {
						router.push('/login')
					},
				})
			}
		},
		refetchOnWindowFocus: false,
	})

	return (
		<div className='flex-col-start gap-compact'>
			<h1 className='text-heading-3'>Account Preference</h1>
			<div className='p-cozy'>
				{userProfileQuery.isLoading && (
					<div className='flex w-full items-center justify-center'>
						<MutatingDots
							height='100'
							width='100'
							color='#56776C'
							secondaryColor='#56776C'
							radius='12.5'
							ariaLabel='mutating-dots-loading'
							visible={true}
						/>
					</div>
				)}
				{userProfileQuery.isSuccess && <UserProfileForm profile={userProfileQuery.data} />}
			</div>
		</div>
	)
}
