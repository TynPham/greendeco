'use client'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export default function ProuductListError() {
	return (
		<div className='flex h-[200px] w-full items-center justify-center text-status-error'>
			<span className='flex-col-center gap-compact'>
				<ExclamationCircleIcon className='aspect-square h-[80px]' />

				<p className='text-body-md'>We encountered an error while getting the products.</p>
			</span>
		</div>
	)
}
