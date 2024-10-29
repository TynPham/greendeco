'use client'
import { OrderState, getOrderFullDetailAsAdministratorById } from '@/app/_api/axios/admin/order'
import { useQuery } from '@tanstack/react-query'
import OrderDropdownState from '../../DropdownState'
import { OrderData, OrderFullDetailData } from '@/app/_api/axios/order'
import OrderInformationWrapper from './OrderInformation'
import { TailSpin } from 'react-loader-spinner'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import {
	BanknotesIcon,
	EnvelopeIcon,
	ExclamationTriangleIcon,
	PhoneIcon,
	TruckIcon,
	UserCircleIcon,
} from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import formatDate from '@/app/_hooks/useFormatDate'
import OrderProductList from './OrderProductList'

export default function OrderDetailManagementPage({
	params,
}: {
	params: {
		orderId: string
	}
}) {
	const { orderId } = params
	const orderQuery = useQuery({
		queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Order, orderId],
		queryFn: () => getOrderFullDetailAsAdministratorById(orderId),
	})

	const { data, isSuccess, isLoading, isError } = orderQuery
	return (
		<>
			{isLoading && (
				<div className='flex w-full items-center justify-center'>
					<TailSpin
						height='200'
						width='200'
						color='#4fa94d'
						ariaLabel='tail-spin-loading'
						radius='1'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
				</div>
			)}
			{isSuccess && <ContentWrapper order={data!} />}
			{isError && <ErrorMessage />}
		</>
	)
}

function ContentWrapper({ order }: { order: OrderFullDetailData }) {
	const router = useRouter()
	const orderDropDown: OrderState = {
		owner_id: order.order.owner_id,
		order_id: order.order.id,
		state: order.order.state,
	}

	return (
		<div className=''>
			<div className='flex items-center justify-between gap-cozy border-b-[1px] border-primary-5555-80 pb-cozy'>
				<h1 className='font-semi-bold text-primary-418'>Manage Order Detail</h1>
				<span
					className='text-xl underline hover:cursor-pointer hover:font-bold'
					onClick={() => router.back()}
				>
					Go back
				</span>
			</div>

			<div className='flex-col-start gap-cozy px-comfortable py-cozy'>
				<div className='flex-col-start gap-compact'>
					<div className='flex items-center gap-compact'>
						<h2 className='text-body-lg'>Status: </h2>
						<OrderDropdownState order={orderDropDown} />
					</div>
					<div className='grid grid-cols-3 gap-comfortable'>
						<div className='col-span-2'>
							<OrderDetail {...order.order} />
						</div>
						<div>
							<UserWrapper order={order.order} />
						</div>
					</div>
				</div>
				<div className='grid grid-cols-3 gap-comfortable'>
					<div className='col-span-2'>
						<OrderProductList productList={order.productList} />
					</div>
					<OrderInformationWrapper order={order} />
				</div>
			</div>
		</div>
	)
}

function UserWrapper({ order }: { order: OrderData }) {
	const { user_name, user_phone_number, user_email, shipping_address } = order
	return (
		<div className='flex-col-start  divide-y divide-primary-418-60 rounded-[8px] border-[2px] border-primary-625-60 p-cozy shadow-18'>
			<div className='flex-col-start gap-[4px] pb-cozy text-body-sm '>
				<h2 className='mb-[4px] text-body-lg font-semi-bold text-primary-625'>Customer</h2>
				<span className='flex items-center gap-compact'>
					<UserCircleIcon className='aspect-square h-[20px] text-primary-5555' />
					{user_name}
				</span>
				<span className='flex items-center gap-compact'>
					<EnvelopeIcon className='aspect-square h-[20px] text-primary-5555' />
					{user_email}
				</span>
				<span className='flex items-center gap-compact'>
					<PhoneIcon className='aspect-square h-[20px] text-primary-5555' />
					{user_phone_number}
				</span>
			</div>
			<div className='flex-col-start gap-[4px] pt-cozy text-body-sm '>
				<div className='flex items-center gap-compact text-primary-625'>
					<TruckIcon className='aspect-square h-[20px]' />
					<h2 className=' text-body-lg font-semi-bold'>Shipping Address</h2>
				</div>
				<span className='flex items-center gap-compact'>{shipping_address}</span>
			</div>
		</div>
	)
}

function OrderDetail({ id, created_at, state, paid_at }: OrderData) {
	return (
		<div className='flex-col-start divide-y divide-primary-625-60 '>
			<div className='flex items-center justify-between py-compact'>
				<h2 className='text-body-lg font-semi-bold'>Order Info</h2>
			</div>
			<div className='flex-col-start gap-common p-cozy text-body-sm'>
				<div className='grid grid-cols-4 '>
					<span className='flex items-center font-semi-bold'>ID:</span>
					<span className='col-span-3'>{id}</span>
				</div>
				<div className='grid grid-cols-4'>
					<span className='flex items-center font-semi-bold'>Date Created:</span>
					<span className='col-span-3'>{formatDate(new Date(created_at))}</span>
				</div>
				<div className='grid grid-cols-4'>
					<span className='flex items-center font-semi-bold'>Payment Status:</span>
					<span className='col-span-3'>
						{paid_at ? (
							<span className='flex w-fit items-center gap-[4px] rounded-[16px] border-[1px] border-status-success bg-status-success px-cozy py-compact font-semi-bold text-neutral-gray-1'>
								Payment Received{' '}
								<BanknotesIcon className='aspect-square h-[16px]'></BanknotesIcon>
								<span>at {formatDate(new Date(paid_at))}</span>
							</span>
						) : state === 'cancelled' ? (
							<span className='flex w-fit items-center gap-[4px] rounded-[16px] border-[1px] border-status-success  px-cozy py-compact font-semi-bold text-status-success'>
								No need to be fulfilled
							</span>
						) : (
							<span className='flex w-fit items-center gap-[4px] rounded-[16px] border-[1px] border-status-success  px-cozy py-compact font-semi-bold text-status-success'>
								Waiting for Payment
							</span>
						)}
					</span>
				</div>
			</div>
		</div>
	)
}

function ErrorMessage() {
	const router = useRouter()
	return (
		<div className='flex h-[200px] w-full items-center justify-center text-status-error'>
			<span className='flex-col-center gap-compact'>
				<ExclamationTriangleIcon className='aspect-square h-[80px]' />

				<span className='flex items-center gap-compact text-body-md'>
					<p className=' font-semi-bold'>Oops, something went wrong!</p>
					<span
						className='font-regular  underline hover:cursor-pointer hover:font-bold'
						onClick={() => router.back()}
					>
						Go back?
					</span>
				</span>
			</span>
		</div>
	)
}
