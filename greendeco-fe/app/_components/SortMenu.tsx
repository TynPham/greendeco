import type { ChangeEvent } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { useCallback } from 'react'

export type SortOptionValueType = {
	sort?: 'asc' | 'desc'
	sortBy?: string
}

export type SortOptionType = {
	label: string
	value: SortOptionValueType
}

type QueryParams<T> = Partial<T> & { offSet: number }

const defaultSortOptions: SortOptionType[] = [
	{
		label: 'Newest',
		value: {
			sort: 'desc',
			sortBy: 'created_at',
		},
	},
	{
		label: 'Oldest',
		value: {
			sort: 'asc',
			sortBy: 'created_at',
		},
	},
]

export const DefaultSortMenu = ({ options }: { options?: SortOptionType[] }) => {
	const { queryObject, setQueryParams } = useQueryParams<QueryParams<SortOptionValueType>>()

	const optionsMenu = options ? options : defaultSortOptions

	const optionFilter = queryObject

	const onSelect = useCallback(
		(event: ChangeEvent<HTMLSelectElement>) => {
			const value: SortOptionValueType = JSON.parse(event.target.value)
			if (value === optionFilter || !event.target.value) {
				setQueryParams({
					sort: undefined,
					sortBy: undefined,
				})
				return
			}

			setQueryParams({ sort: value.sort, sortBy: value.sortBy, offSet: 1 })
		},
		[setQueryParams, optionFilter],
	)

	return (
		<select
			className='rounded-[4px] border-[1px] border-primary-625 bg-primary-5555 px-cozy py-compact text-body-md text-white'
			onChange={onSelect}
		>
			{/*NOTE: option value type can be only string => stringify the object */}
			{optionsMenu.map((opt) => (
				<option
					key={opt.label}
					value={JSON.stringify(opt.value)}
				>
					{opt.label}
				</option>
			))}
		</select>
	)
}
