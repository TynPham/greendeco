import { DefaultSortMenu, SortOptionType } from '@/app/_components/SortMenu'
import type { ChangeEvent } from 'react'

const options: SortOptionType[] = [
	{
		label: 'Newest',
		value: {
			sort: 'desc',
			sortBy: 'created_at',
		},
	},
	{
		label: 'Price Increase',
		value: {
			sort: 'asc',
			sortBy: 'price',
		},
	},
	{
		label: 'Price Decrease',
		value: {
			sort: 'desc',
			sortBy: 'price',
		},
	},
]

export const ProductSortMenu = () => {
	return <DefaultSortMenu options={options} />
}
