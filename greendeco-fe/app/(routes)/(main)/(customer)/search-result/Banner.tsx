export default function Banner() {
	return (
		<div className='flex h-[280px] w-full items-end border-b-[1px] border-b-primary-625 bg-search-banner bg-cover bg-no-repeat  py-common'>
			<div className='container'>
				<h1 className='mb-cozy text-center text-[4rem] font-semi-bold capitalize text-white'>
					Search
				</h1>
				<div className='flex-col-start items-center gap-compact text-center text-white'>
					<p className='text-heading-3 font-semi-bold italic'>
						&quot;I think that any time of great pain is a time of transformation, a
						fertile time to plant new seeds.&quot;
					</p>
					<p className='text-body-lg'>- Debbie Ford</p>
				</div>
			</div>
		</div>
	)
}
