import Button from '@/app/_components/Button'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import usePagination from '@/app/_hooks/usePagination'

type PaginationProps = {
	next: boolean
	prev: boolean
}

export default function OrderListPagination(props: PaginationProps) {
	const { next, prev } = props

	const { goToNextPage, goToPreviousPage } = usePagination()

	return (
		<div className='flex items-center justify-center gap-cozy'>
			<Button
				className='flex  items-center  gap-compact rounded-[4px] px-cozy py-compact font-normal'
				disabled={!prev}
				onClick={goToPreviousPage}
			>
				<ArrowLeftIcon className='aspect-square w-[16px]' />
				Previous
			</Button>
			<Button
				className='flex  items-center  gap-compact rounded-[4px] px-cozy py-compact font-normal'
				disabled={!next}
				onClick={goToNextPage}
			>
				Next
				<ArrowRightIcon className='aspect-square w-[16px]' />
			</Button>
		</div>
	)
}
