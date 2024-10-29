import Skeleton from 'react-loading-skeleton'

export default function ProductDetailLoading() {
	return (
		<div className='h-screen w-full'>
			<div className='grid h-[500px] grid-cols-2 gap-comfortable'>
				<Skeleton
					containerClassName='w-full h-full'
					width={'100%'}
					height={'100%'}
				/>
				<span className='flex-col-start gap-comfortable '>
					<Skeleton height={60} />
					<p>
						<Skeleton
							count={10}
							className='mb-[8px]'
						/>
					</p>
				</span>
			</div>
		</div>
	)
}
