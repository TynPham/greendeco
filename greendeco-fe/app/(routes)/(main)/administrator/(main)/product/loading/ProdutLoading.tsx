import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export function ProductDetailLoading() {
	return (
		<div className='grid grid-cols-2 gap-comfortable'>
			<SkeletonTheme
				baseColor='#e4e8e3'
				highlightColor='#f7f8f7'
				duration={2}
				borderRadius={4}
			>
				<div className='flex-col-start gap-comfortable'>
					<span>
						<Skeleton
							height={40}
							className='mb-comfortable'
						/>
						<p>
							<Skeleton
								height={16}
								count={4}
								className='mb-cozy'
							/>
						</p>
					</span>
					<span>
						<Skeleton
							height={40}
							className='mb-comfortable'
						/>
						<p>
							<Skeleton
								height={16}
								count={4}
								className='mb-cozy'
							/>
						</p>
					</span>
				</div>
				<div className='grid grid-cols-3 gap-cozy'>
					<Skeleton
						height={'auto'}
						className='mb-comfortable aspect-square'
					/>
					<Skeleton
						height={'auto'}
						className='mb-comfortable aspect-square'
					/>
					<Skeleton
						height={'auto'}
						className='mb-comfortable aspect-square'
					/>
				</div>
			</SkeletonTheme>
		</div>
	)
}
