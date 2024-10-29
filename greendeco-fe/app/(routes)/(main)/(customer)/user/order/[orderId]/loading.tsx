import Skeleton from 'react-loading-skeleton'

export default function UserOrderDetailLoading() {
	return (
		<div className='flex-col-start w-full gap-comfortable'>
			<div className='grid grid-cols-3 gap-comfortable'>
				<span className='flex-col-start col-span-2 gap-cozy '>
					<Skeleton height={60} />
					<p>
						<Skeleton
							count={4}
							className='mb-[8px]'
						/>
					</p>
				</span>
				<Skeleton
					containerClassName='w-full aspect-square'
					width={'100%'}
					height={'100%'}
				/>
			</div>
			<p>
				<Skeleton
					height={16}
					count={5}
					className='mb-cozy'
				/>
			</p>
		</div>
	)
}
