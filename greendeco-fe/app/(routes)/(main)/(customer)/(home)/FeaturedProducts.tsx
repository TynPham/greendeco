'use client'

import clsx from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'
import FeaturedProductCarousel from './FeaturedProductCarousel'

type ProductFilterType = 'new' | 'topRated' | 'cheap'

interface TabOption {
	type: ProductFilterType
	label: string
}

const PRODUCT_TABS: TabOption[] = [
	{ type: 'new', label: 'New Release' },
	{ type: 'topRated', label: 'Top Rated' },
	{ type: 'cheap', label: 'Student Friendly' },
]

const TabOptionComponent = ({ label, active }: { label: string; active: boolean }) => (
	<h2
		className={clsx('text-neutral-gray-1 transition-all duration-200 ease-in-out', {
			'text-heading-3 font-semi-bold md:text-heading-2 lg:text-heading-1': active,
			'text-body-xsm font-regular md:text-body-sm lg:text-body-md': !active,
		})}
	>
		{label}
	</h2>
)

export default function FeaturedProducts() {
	const [activeFilter, setActiveFilter] = useState<ProductFilterType>('new')

	return (
		<section className='section-home min-h-[500px] bg-primary-5555'>
			<div className='container'>
				<div className='flex-col-start gap-comfortable'>
					<div className='flex items-end justify-between border-b-[1px] border-neutral-gray-1 py-cozy'>
						<ul className='flex h-[4rem] items-end lg:gap-comfortable'>
							{PRODUCT_TABS.map((tab) => (
								<li
									key={tab.type}
									className='cursor-pointer px-compact lg:px-cozy'
									onClick={() => setActiveFilter(tab.type)}
								>
									<TabOptionComponent
										label={tab.label}
										active={tab.type === activeFilter}
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

					<FeaturedProductCarousel type={activeFilter} />
				</div>
			</div>
		</section>
	)
}
