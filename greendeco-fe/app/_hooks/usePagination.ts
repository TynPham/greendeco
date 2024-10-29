import { useCallback } from 'react'
import useQueryParams from '@/app/_hooks/useQueryParams'

type QueryPararms = {
	offSet: number
}

export default function usePagination() {
	const { queryParams, setQueryParams } = useQueryParams<QueryPararms>()

	const offSetValue = queryParams?.get('offSet')
	const currentPage: QueryPararms['offSet'] =
		offSetValue && offSetValue !== '0' ? Number.parseInt(offSetValue) : 1

	const changePage = useCallback(
		(pageNumber: number) => {
			return pageNumber === 0
				? setQueryParams({ offSet: undefined })
				: setQueryParams({ offSet: pageNumber })
		},
		[setQueryParams],
	)

	const handlePageChange = (destinationPage: number) => {
		changePage(destinationPage)
	}

	const goToNextPage = () => {
		handlePageChange(currentPage + 1)
	}

	const goToPreviousPage = () => {
		handlePageChange(currentPage - 1)
	}

	return {
		goToNextPage: goToNextPage,
		goToPreviousPage: goToPreviousPage,
	}
}
