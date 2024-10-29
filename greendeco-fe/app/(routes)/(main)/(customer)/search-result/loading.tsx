import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export default function ProductListLoading() {
	return (
		<div className='grid grid-cols-4 gap-cozy'>
			<SkeletonTheme
				baseColor='#e4e8e3'
				highlightColor='#f7f8f7'
				duration={2}
				borderRadius={4}
			>
				<span>
					<Skeleton
						height={220}
						className='mb-[8px]'
					/>
					<p>
						<Skeleton count={2} />
					</p>
				</span>
				<span>
					<Skeleton
						className='mb-[8px]'
						height={220}
					/>
					<p>
						<Skeleton count={2} />
					</p>
				</span>
				<span>
					<Skeleton
						className='mb-[8px]'
						height={220}
					/>
					<p>
						<Skeleton count={2} />
					</p>
				</span>
				<span>
					<Skeleton
						className='mb-[8px]'
						height={220}
					/>
					<p>
						<Skeleton count={2} />
					</p>
				</span>
			</SkeletonTheme>
		</div>
	)
}
