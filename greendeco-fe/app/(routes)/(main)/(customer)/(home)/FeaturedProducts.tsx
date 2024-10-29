'use client'

import clsx from 'clsx'
import { useMemo, useState } from 'react'
import FeaturedProductCarousel from './FeaturedProductCarousel'
import Link from 'next/link'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'

type FetureOptionType = {
	type: 'new' | 'topRated' | 'cheap'
	label: string
}

const featureOptions: FetureOptionType[] = [
	{
		type: 'new',
		label: 'New Release',
	},
	{
		type: 'topRated',
		label: 'Top Rated',
	},
	{
		type: 'cheap',
		label: 'Student Friendly',
	},
]
export default function FeaturedProduct() {
	const [activeType, setActiveType] = useState<FetureOptionType['type']>('new')

	return (
		<section className='section-home min-h-[500px] bg-primary-5555'>
			<div className='container'>
				<div className='flex-col-start gap-comfortable '>
					<div className='flex items-end justify-between border-b-[1px] border-neutral-gray-1 py-cozy'>
						<ul className='flex h-[4rem] items-end gap-comfortable'>
							{featureOptions.map((opt) => (
								<li
									className='cursor-pointer px-cozy'
									key={opt.type}
									onClick={() => setActiveType(opt.type)}
								>
									<Option
										label={opt.label}
										active={opt.type === activeType}
									/>
								</li>
							))}
						</ul>
						<Link
							href={SHOP_ROUTE.SHOP_LIST.LINK}
							className='text-body-sm text-neutral-gray-1 underline'
						>
							Shop All
						</Link>
					</div>
					<FeaturedProductCarousel type={activeType} />
				</div>
			</div>
		</section>
	)
}

function Option({ label, active }: { label: FetureOptionType['label']; active: boolean }) {
	return (
		<h2
			className={clsx('text-neutral-gray-1  transition-all duration-200 ease-in-out', {
				'text-heading-1 font-semi-bold': active,
				'text-body-md font-regular': !active,
			})}
		>
			{label}
		</h2>
	)
}
