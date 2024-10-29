import { NotificationListResponseData } from '@/app/_api/axios/notification'
import { NotificationItem as Item } from './NotificationItem'
import { BellSlashIcon } from '@heroicons/react/24/solid'

export default function NotificationList(props: NotificationListResponseData) {
	const { items, page_size } = props
	return (
		<>
			{page_size === 0 && (
				<span className='flex h-[30vh] w-full items-center justify-center text-primary-418-60'>
					<div className='flex-col-start items-center gap-compact'>
						<BellSlashIcon className='aspect-square h-[60px]' />
						<span className='text-body-xsm'>There has not any new notification</span>
					</div>
				</span>
			)}
			{items && page_size > 0 && (
				<div className='p-compact'>
					<span className='text-body-sm font-semi-bold text-primary-418-80'>
						Most Recent
					</span>
					<ul className='flex-col-start w-full  '>
						{items.map((item) => (
							<li key={item.id}>
								<Item {...item} />
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	)
}
