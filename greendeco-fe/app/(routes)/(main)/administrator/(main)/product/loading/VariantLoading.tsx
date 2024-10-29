import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export function VariantDetailLoading() {
	return (
		<div className='grid grid-cols-3 gap-comfortable'>
			<SkeletonTheme
				baseColor='#e4e8e3'
				highlightColor='#f7f8f7'
				duration={2}
				borderRadius={4}
			>
				<Skeleton
					height={'auto'}
					className=' aspect-square'
				/>
				<Skeleton
					height={16}
					count={8}
					className='mb-compact'
				/>
			</SkeletonTheme>
		</div>
	)
}

export function VariantFormLoading() {
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
				<Skeleton
					width={'60%'}
					height={'auto'}
					className='mb-comfortable aspect-square'
				/>
			</SkeletonTheme>
		</div>
	)
}
