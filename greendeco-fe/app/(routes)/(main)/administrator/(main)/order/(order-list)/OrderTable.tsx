import { OrderTableData, OrderState } from '@/app/_api/axios/admin/order'
import formatDate from '@/app/_hooks/useFormatDate'
import {
	createColumnHelper,
	useReactTable,
	getCoreRowModel,
	flexRender,
} from '@tanstack/react-table'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE, VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import OrderDropdownState from '../DropdownState'

const columHelper = createColumnHelper<OrderTableData>()

const columns = [
	columHelper.accessor('owner_info', {
		size: 400,
		cell: (info) => (
			<div className='flex-col-start w-full gap-[4px]'>
				<Link
					className='underline hover:font-semi-bold'
					href={`${ADMINISTRATOR_ROUTE.ORDER_DETAIL.LINK}/${info.getValue().order_id!}`}
				>
					{info.getValue().order_id}
				</Link>
				<p className='text-body-sm'>
					<span className='font-semi-bold'>Customer:</span> {info.getValue().user_name}
				</p>
				<p className='text-body-sm'>
					<span className='font-semi-bold'>Phone Number:</span>{' '}
					{info.getValue().userPhoneNumber}
				</p>
			</div>
		),
		header: () => <span>Order Detail</span>,
	}),

	columHelper.accessor('OrderData', {
		size: 300,
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{info.getValue().shipping_address}
			</span>
		),
		header: () => <span>Shipping Address</span>,
	}),

	columHelper.accessor('OrderPrice.total', {
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{info.getValue()} {VARIANT_CURRENCY}
			</span>
		),
		header: () => <span>Price</span>,
		size: 120,
	}),

	columHelper.accessor('OrderData.created_at', {
		size: 250,
		cell: (info) => (
			<span className='inline-block w-full text-center'>
				{formatDate(new Date(info.getValue()))}
			</span>
		),
		header: () => <span>Date Created</span>,
	}),

	columHelper.accessor('order_state', {
		id: 'Action',
		cell: (info) => {
			return <ActionWrapper order={info.getValue()} />
		},
		header: () => <span>Actions</span>,
	}),
]

const ActionWrapper = ({ order }: { order: OrderState }) => {
	return (
		<div className='flex min-w-[150px] items-center justify-center'>
			<OrderDropdownState order={order} />
		</div>
	)
}

export default function OrderTable({ order }: { order: OrderTableData[] }) {
	const table = useReactTable({
		data: order,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})

	return (
		<div className='w-full border-[1px] border-primary-625-40 '>
			<div className='w-full border-b-[1px] border-primary-625-60 p-3 text-2xl text-primary-418-60 '>
				{order.length} Order(s) in queue
			</div>
			<table className='w-full'>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr
							className='border-b-[1px] border-primary-625-80'
							key={headerGroup.id}
						>
							{headerGroup.headers.map((header) => (
								<th
									className='border-r-[1px] border-primary-625 bg-primary-5555-20 p-compact text-body-sm text-primary-625 last:border-0'
									colSpan={header.colSpan}
									style={{
										width:
											header.getSize() !== 150 ? header.getSize() : undefined,
									}}
									key={header.id}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody>
					{table.getRowModel().rows.map((row) => (
						<tr
							className='border-b-[1px] border-primary-625 last:border-0 hover:bg-primary-5555-20/50'
							key={row.id}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									className='border-r-[1px] border-primary-625 p-compact text-body-sm last:border-0'
									key={cell.id}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
