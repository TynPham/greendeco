'use client'
import { ORDER_STATE_FIELD } from '@/app/_configs/constants/variables'
import useQueryParams from '@/app/_hooks/useQueryParams'
import clsx from 'clsx'
import Link from 'next/link'
import { useMemo } from 'react'

type QueryParams = {
	offSet: number
	field: string | null
}

export default function OrderStateFilter() {
	const orderStates = useMemo(() => ORDER_STATE_FIELD, [])
	const { queryParams } = useQueryParams<QueryParams>()
	const fieldQuery: QueryParams['field'] = queryParams?.get('field')
	return (
		<ul className='flex w-full capitalize'>
			<Link
				href={{
					pathname: '',
					query: {
						field: null,
					},
				}}
				replace={true}
				className={clsx(
					'w-full px-comfortable py-compact text-center text-body-sm font-semi-bold ',
					{
						'border-b-[3px] border-primary-418 text-primary-418':
							fieldQuery === '' || !fieldQuery,
						'border-b-[1px] border-primary-418-20 text-primary-418-60':
							fieldQuery !== '' && fieldQuery,
					},
				)}
			>
				All
			</Link>
			{Object.entries(orderStates).map(([key, value]) => (
				<Link
					key={key}
					href={{
						pathname: '',
						query: {
							field: JSON.stringify(value),
						},
					}}
					replace={true}
					className={clsx(
						'w-full px-comfortable py-compact text-center text-body-sm font-semi-bold ',
						{
							'border-b-[3px] border-primary-418 text-primary-418':
								fieldQuery === JSON.stringify(value),
							'border-b-[1px] border-primary-418-20 text-primary-418-60':
								fieldQuery !== JSON.stringify(value),
						},
					)}
				>
					{key}
				</Link>
			))}
		</ul>
	)
}
