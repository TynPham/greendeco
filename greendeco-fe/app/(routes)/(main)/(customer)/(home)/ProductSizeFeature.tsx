'use client'

import clsx from 'clsx'
import { useState } from 'react'
import Link from 'next/link'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'
import ProductGridBySize from './ProductGridBySize'

// Move types to separate file or types folder
type Size = 'S' | 'M' | 'L' | 'XL'

type SizeOption = {
	label: string
	size: Size
}

// Move constants to separate file or constants folder
const SIZE_OPTIONS: SizeOption[] = [
	{ label: 'Small', size: 'S' },
	{ label: 'Medium', size: 'M' },
	{ label: 'Large', size: 'L' },
	{ label: 'Extra Large', size: 'XL' },
]

// Extract SizeSelector as separate component
function SizeSelector({
	activeSize,
	onSizeChange,
}: {
	activeSize: Size
	onSizeChange: (size: Size) => void
}) {
	return (
		<ul className='flex h-[4rem] w-fit items-end justify-center border-b-[1px] border-primary-5555 pb-cozy'>
			{SIZE_OPTIONS.map((opt) => (
				<li
					className='cursor-pointer px-cozy'
					key={opt.size}
					onClick={() => onSizeChange(opt.size)}
				>
					<SizeOptionComponent
						label={opt.label}
						active={opt.size === activeSize}
					/>
				</li>
			))}
		</ul>
	)
}

// Extract SizeOption as separate component
function SizeOptionComponent({ label, active }: { label: string; active: boolean }) {
	return (
		<span
			className={clsx('text-primary-5555 transition-all duration-200 ease-in-out', {
				'text-heading-1 font-semi-bold': active,
				'text-body-md font-regular': !active,
			})}
		>
			{label}
		</span>
	)
}

// Extract FeatureDescription as separate component
function FeatureDescription() {
	return (
		<div className='flex-col-start order-2 col-span-6 mx-24 min-h-[400px] justify-center gap-cozy md:order-1 md:col-span-2 md:mx-0'>
			<h2 className='text-[3rem] text-primary-625'>It Comes With Different Sizes!</h2>
			<p className='text-body-md text-primary-418'>
				We are able to offer you a wide range of beautiful plants in various sizes. Any
				tree, no matter how big or small, is willing to be your friend.
			</p>
			<Link
				href={SHOP_ROUTE.SHOP_LIST.LINK}
				className='btn w-fit px-comfortable text-body-sm'
			>
				View More
			</Link>
		</div>
	)
}

// Main component
export default function ProductSizeFeature() {
	const [activeSize, setActiveSize] = useState<Size>('S')

	return (
		<section className='section-home flex bg-primary-625-40/50'>
			<div className='container h-full'>
				<div className='grid h-full grid-cols-6 gap-comfortable'>
					<FeatureDescription />
					<div className='order-1 col-span-6 h-fit md:order-2 md:col-span-4'>
						<div className='flex-col-start items-center gap-comfortable'>
							<SizeSelector
								activeSize={activeSize}
								onSizeChange={setActiveSize}
							/>
							<ProductGridBySize size={activeSize} />
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
