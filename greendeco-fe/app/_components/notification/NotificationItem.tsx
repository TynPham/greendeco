import { NotificationData } from '@/app/_api/axios/admin/notification'
import { USER_SETTING_ROUTE } from '@/app/_configs/constants/variables'
import formatDate from '@/app/_hooks/useFormatDate'
import Link from 'next/link'

export function NotificationItem(props: NotificationData) {
	const { message, created_at, title, description } = props
	return (
		<Link
			href={`${USER_SETTING_ROUTE.ORDER.LINK}/${description}`}
			className='flex-col-start w-full gap-compact rounded-[8px] p-cozy transition duration-100 ease-out hover:bg-primary-5555-20/50'
		>
			<div className='flex-col-start gap-[4px]'>
				<span className='truncate text-body-sm font-bold text-primary-418'>{title}</span>
				<p className='line-clamp-3 text-body-xsm text-primary-418-80'>{message}</p>
			</div>
			<div className='flex items-end justify-between'>
				<p className='text-body-xsm font-semi-bold text-primary-5555-80'>
					{formatDate(new Date(created_at))}
				</p>
			</div>
		</Link>
	)
}
