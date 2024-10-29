'use client'

import { getCartItemListFromCartId } from '@/app/_api/axios/cart'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import {
	CartListFullDetail,
	handleGetCartFullDetail,
	CartItemWithFullVariantInfo,
} from '@/app/_hooks/useCart'
import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'
import { VariantData } from '@/app/_api/axios/product'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { NOT_FOUND_STATUS, UNAUTHORIZE_STATUS } from '@/app/_configs/constants/status'
import { memo } from 'react'
import { MutatingDots } from 'react-loader-spinner'
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'

function OrderItemList() {
	const router = useRouter()
	const getCartItemForCheckout = async () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
		const cartId = getCookie('cartId')?.toString()

		if (!accessToken) throw new AxiosError('Unauthorized', UNAUTHORIZE_STATUS.toString())
		if (!cartId) throw new AxiosError('Cart does not exist', NOT_FOUND_STATUS.toString())

		return await getCartItemListFromCartId(cartId, accessToken).then((cartInfo) =>
			handleGetCartFullDetail(cartInfo),
		)
	}

	const getOrderList = useQuery({
		queryKey: [UseQueryKeys.User, 'cart', 'order'],
		queryFn: getCartItemForCheckout,
		onSuccess: (data) => {
			if (data.page_size === 0) {
				router.back()
			}
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				if (
					e.code === NOT_FOUND_STATUS.toString() ||
					e.response?.status === NOT_FOUND_STATUS
				) {
					router.back()
				}
				if (
					e.code === UNAUTHORIZE_STATUS.toString() ||
					e.response?.status === UNAUTHORIZE_STATUS
				) {
					router.push('/login')
				}
			}
		},

		retry: false,
	})

	const { data, isLoading } = getOrderList

	return (
		<div className='flex-col-start h-full max-h-full gap-compact  '>
			<h2 className='text-body-md font-semibold text-neutral-gray-10'>Order Summary</h2>
			{isLoading && (
				<div className='flex w-full justify-center'>
					<MutatingDots
						height='100'
						width='100'
						color='#4fa94d'
						secondaryColor='#4fa94d'
						radius='12.5'
						ariaLabel='mutating-dots-loading'
						wrapperStyle={{}}
						wrapperClass=''
						visible={true}
					/>
				</div>
			)}
			{data && data.page_size > 0 && (
				<>
					<OrderList orderList={data.items} />
					<OrderCalculator {...data} />
				</>
			)}
		</div>
	)
}

function OrderList({ orderList }: { orderList: CartListFullDetail['items'] }) {
	return (
		<ul className='flex-col-start w-full divide-y divide-primary-5555-40 overflow-y-auto rounded-[4px] bg-neutral-gray-1 p-cozy shadow-63  '>
			{orderList.map((item) => (
				<li
					key={item.id}
					className='py-cozy first:pt-0 last:pb-0'
				>
					<OrderItem cartItem={item} />
				</li>
			))}
		</ul>
	)
}
function OrderItem({ cartItem }: { cartItem: CartItemWithFullVariantInfo }) {
	const { variant, quantity } = cartItem

	return (
		<div className='flex w-full gap-cozy'>
			<OrderItemImage
				imageSrc={variant.image}
				name={variant.name}
			/>
			<div className='flex-col-start flex-1 justify-between'>
				<OrderItemDetail
					variant={{ ...variant }}
					quantity={quantity}
				/>
			</div>
		</div>
	)
}

function OrderItemImage({
	imageSrc,
	name,
}: {
	imageSrc: VariantData['image']
	name: VariantData['name']
}) {
	return (
		<div className='relative aspect-square w-[80px] overflow-hidden '>
			<Image
				src={imageSrc}
				fill
				style={{ objectFit: 'fill' }}
				alt={name}
			/>
		</div>
	)
}
function OrderItemDetail({
	variant,
	quantity,
}: {
	variant: VariantData
	quantity: CartItemWithFullVariantInfo['quantity']
}) {
	const { name, color, color_name, price, currency } = variant
	return (
		<div className='flex-col-start h-full justify-between'>
			<div className='flex-col-start gap-[4px]'>
				<div className='flex items-center justify-between text-primary-625'>
					<span className='text-body-sm font-semi-bold '>{name}</span>
					<span className='text-body-sm'>x{quantity}</span>
				</div>
				<div className='flex items-center gap-compact text-body-xsm'>
					<span className='text-primary-418'>Pot:</span>
					<div className='flex items-center gap-compact'>
						<span
							className='aspect-square h-[24px] rounded-[100%]'
							style={{ backgroundColor: `${color}` }}
						/>
						<span className='capitalize text-primary-418'>{color_name}</span>
					</div>
				</div>
			</div>
			<span className='text-body-sm font-semi-bold'>
				{price} {currency}
			</span>
		</div>
	)
}

function OrderCalculator({ items }: CartListFullDetail) {
	const currency = items[0].variant.currency
	const subTotalPrice = items.reduce((accumulator, item) => {
		return accumulator + parseInt(item.variant.price) * item.quantity
	}, 0)

	const totalPrice = () => {
		const discount = subTotalPrice * 0
		return subTotalPrice - discount
	}

	return (
		<div className='flex-col-start mt-cozy w-full divide-y divide-primary-5555 rounded-[4px] bg-neutral-gray-1 p-cozy shadow-63 '>
			<div className='flex-col-start gap-compact pb-cozy'>
				<div className='flex items-center justify-between text-primary-418'>
					<span className='text-body-sm'>Subtotal:</span>
					<span className='text-body-md font-semi-bold'>
						{subTotalPrice} {currency}
					</span>
				</div>
				<div className='flex items-center justify-between text-primary-418'>
					<span className='text-body-sm'>Discount:</span>
					<span className='text-body-md font-semi-bold'>--</span>
				</div>
			</div>
			<div className='flex items-center justify-between pt-cozy'>
				<span className='text-body-md font-semi-bold'>Total:</span>
				<span className='text-body-lg font-bold'>
					{totalPrice()} {currency}
				</span>
			</div>
		</div>
	)
}

export default memo(OrderItemList)
