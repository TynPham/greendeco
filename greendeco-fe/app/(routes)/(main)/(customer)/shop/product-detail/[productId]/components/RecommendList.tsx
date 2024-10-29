import Image from 'next/image'
import { PlusIcon } from '@heroicons/react/24/solid'

export const RecommendList = () => {
	return (
		<div className='flex-col-start gap-compact'>
			<RecommendItem />
		</div>
	)
}

const RecommendItem = () => {
	return (
		<span className='flex overflow-hidden rounded-[8px] border-[1px] border-primary-580-40'>
			<span className='relative aspect-square w-[80px]'>
				<Image
					fill
					src={
						'https://bloomscape.com/cdn-cgi/image/quality=75,fit=scale-down,height=922,width=768,metadata=copyright,format=webp/wp-content/uploads/2022/06/bloomscape_watering-can_1b-scaled.jpg'
					}
					alt='plants art'
					style={{ objectFit: 'fill' }}
				/>
			</span>
			<span className='flex flex-1 items-center p-cozy'>
				<div className='flex-col-start w-full flex-1 gap-[4px]'>
					<span className='text-body-sm'>Watering Can</span>
					<span className='text-body-sm'>$ 14</span>
				</div>
				<span className='flex items-center justify-center rounded-[4px] border-[1px] border-primary-5555 p-[4px]'>
					<PlusIcon className='aspect-square w-[24px] text-primary-5555' />
				</span>
			</span>
		</span>
	)
}
