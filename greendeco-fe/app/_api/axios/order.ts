import axios, { AxiosError } from 'axios'
import { CartInfoData } from './cart'
import { headers } from 'next/dist/client/components/headers'
import { getCookie } from 'cookies-next'
import {
	ACCESS_TOKEN_COOKIE_NAME,
	ADMIN_ACCESS_TOKEN_COOKIE_NAME,
} from '@/app/_configs/constants/cookies'
import { UserProfileResponseData } from './user'
import {
	FilterParams,
	ProductData,
	VariantData,
	fieldJSONParse,
	getProductBaseById,
	getProductDetailById,
} from './product'
import { BAD_REQUEST_STATUS } from '@/app/_configs/constants/status'

const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/order`

type OrderState = 'draft' | 'processing' | 'completed' | 'cancelled'

export type CreateOrderData = {
	cart_id: CartInfoData['id']
	coupon_id?: string
	shipping_address: OrderData['shipping_address']
}

type CreateOrderRequestData = {
	createOrderData: CreateOrderData
	accessToken: string | undefined
}

export type OrderData = {
	id: string
	owner_id: UserProfileResponseData['id']
	user_name: string
	user_email: UserProfileResponseData['email']
	shipping_address: string
	user_phone_number: UserProfileResponseData['phoneNumber']
	state: OrderState
	description: string
	coupon_id: string | null
	coupon_discount: number
	paid_at: string | null
	created_at: string
	updated_at: string
}

export type OrderDetailResponseData = {
	items: OrderData
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export type OrderListData = {
	items: OrderData[]
	next: boolean
	page: number
	page_size: number
	prev: boolean
}

export type OrderProductData = {
	id: string
	order_id: OrderData['id']
	variant_id: VariantData['id']
	variant_name: VariantData['name']
	variant_price: VariantData['price']
	quantity: number
	product_image: ProductData['images'][0] | undefined
	product_id: ProductData['id']
}

export type OrderFullDetailData = {
	order: OrderData
	productList: OrderProductList['items']
	price: OrderPrice
}

export type OrderProductList = {
	items: OrderProductData[]
}

type OrderPrice = {
	actual_price: number
	total: number
}

export type CreateOrderResponseData = {
	id: OrderData['id']
}

export const orderApi = axios.create({
	baseURL: ORDER_URL,
})

export const createOrder = async (data: Omit<CreateOrderData, 'cart_id'>) => {
	const cartId = getCookie('cartId')?.toString()
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	if (!cartId) throw new AxiosError('There is no cart available', '404')
	if (!accessToken) throw new AxiosError('Unauthorized', '401')

	const orderData: CreateOrderData = {
		cart_id: cartId,
		...data,
	}

	return await orderApi.post<CreateOrderResponseData>(
		'',
		{
			...orderData,
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}

export const getOrderListByUser = async (params?: FilterParams, token?: string) => {
	let paramAfterJSON
	if (params) {
		paramAfterJSON = fieldJSONParse(params)
	}

	const accessToken = token ? token : getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await orderApi
		.get<OrderListData>('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}

export const getOrderDetailById = async (id: OrderData['id'], token?: string) => {
	const accessToken = token ? token : getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await orderApi
		.get<OrderDetailResponseData>(`/${id}`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const getOrderProductListById = async (id: OrderData['id'], token?: string) => {
	const accessToken = token ? token : getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await orderApi
		.get<OrderProductList>(`/${id}/product`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const getOrderPrice = async (id: OrderData['id'], token?: string) => {
	const accessToken = token ? token : getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await orderApi
		.get<OrderPrice>(`${id}/total`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const getOrderProductWithImageListById = async (id: OrderData['id'], token?: string) => {
	const accessToken = token ? token : getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await getOrderProductListById(id, accessToken).then(async (orderProductList) => {
		return await Promise.all(
			orderProductList.items.map(async (orderItem) => {
				return await getProductBaseById(orderItem.product_id)
					.catch((e) => {
						if (e instanceof AxiosError && e.response?.status === BAD_REQUEST_STATUS) {
							return undefined
						}
					})
					.then((product) => {
						if (product) {
							const orderWithImage: OrderProductData = {
								...orderItem,
								product_image: product.items.images[0],
							}
							return orderWithImage
						} else {
							return orderItem
						}
					})
			}),
		).then((orderProductWithImageList) => {
			return orderProductWithImageList
		})
	})
}

export const getOrderFullDetailById = async (orderId: OrderData['id']) => {
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await Promise.all([
		getOrderDetailById(orderId, accessToken),
		getOrderProductWithImageListById(orderId, accessToken),
		getOrderPrice(orderId, accessToken),
	]).then(([order, productList, price]) => {
		const orderFullDetail: OrderFullDetailData = {
			order: order.items,
			productList: productList,
			price: price,
		}
		return orderFullDetail
	})
}
