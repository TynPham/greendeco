import {
	OrderData,
	OrderDetailResponseData,
	OrderFullDetailData,
	OrderListData,
	OrderProductData,
	OrderProductList,
	getOrderDetailById,
	getOrderPrice,
	getOrderProductListById,
	getOrderProductWithImageListById,
	orderApi,
} from '../order'
import axios from 'axios'
import { FilterParams, fieldJSONParse } from '../product'
import { OrderState as StateOfOrder } from '@/app/_configs/constants/paramKeys'
import { createNotification, sendNotification } from './notification'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'
import { getCookie } from 'cookies-next'
const ORDER_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`

type AdminAccessTokenType = string | undefined

export type OrderTableData = {
	OrderData: OrderData
	owner_info: OrderInfo
	order_state: OrderState
	OrderPrice: OrderTotalData
}

export type OrderInfo = {
	order_id: string
	user_name: string
	userPhoneNumber: string
}

export type OrderState = {
	order_id: string
	state: string
	owner_id: string
}

export const adminOrderApi = axios.create({
	baseURL: ORDER_URL,
})

export type OrderTotalData = {
	total: string
	actual_price: string
}

export const getOrderListAsAdministrator = async (
	adminAccessToken: AdminAccessTokenType,
	params?: FilterParams,
) => {
	let paramAfterJSON
	if (params) {
		paramAfterJSON = fieldJSONParse(params)
	}
	return await adminOrderApi
		.get<OrderListData>('/order/all/', {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
			params: { ...paramAfterJSON },
		})
		.then((res) => res.data)
}

export const getOrderTotalAsAdministrator = async (
	adminAccessToken: AdminAccessTokenType,
	id: string,
) => {
	return await adminOrderApi
		.get<OrderTotalData>(`/order/${id}/total`, {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}

// getOrderListTable use to get order table data
export const getOrderListTable = async (
	adminAccessToken: AdminAccessTokenType,
	params?: FilterParams,
) => {
	const orders = await getOrderListAsAdministrator(adminAccessToken, params)
	return await Promise.all(
		orders.items.map(async (order) => {
			const price = await getOrderTotalAsAdministrator(adminAccessToken, order.id)
			var row: OrderTableData = {
				owner_info: {
					order_id: order.id,
					user_name: order.user_name,
					userPhoneNumber: order.user_phone_number,
				},
				order_state: {
					order_id: order.id,
					state: order.state,
					owner_id: order.owner_id,
				},
				OrderPrice: { ...price },
				OrderData: {
					...order,
				},
			}
			return row
		}),
	)
}

export const getOrderByIdAsAdminstrator = async (
	adminAccessToken: AdminAccessTokenType,
	orderId?: string,
) => {
	return await orderApi
		.get<OrderDetailResponseData>(`/${orderId}`, {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}

export const getOrderProductByOrderAsAdminstrator = async (
	adminAccessToken: AdminAccessTokenType,
	orderId: string,
) => {
	return await orderApi
		.get<OrderProductList>(`/${orderId}/product/`, {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		})
		.then((res) => res.data)
}

export type OrderStatusRequest = {
	adminAccessToken: AdminAccessTokenType
	orderId: string
	state: string
	description?: string
}

export const updateOrderStatus = async ({
	adminAccessToken,
	orderId,
	state,
	description,
}: OrderStatusRequest) => {
	return await orderApi
		.put(
			`/${orderId}`,
			{
				state: state,
				description: description,
			},
			{
				headers: {
					Authorization: `Bearer ${adminAccessToken}`,
				},
			},
		)
		.then((res) => res.data)
}

export type ProcessStatusRequest = {
	adminAccessToken: AdminAccessTokenType
	orderId: string
	paid_at: string
	title: string
	message: string
	userId: string
	state: StateOfOrder
}

// updateProcessStatus only use for only update process order status
export const updateOrderProcessStatus = async ({
	adminAccessToken,
	orderId,
	paid_at,
	title,
	message,
	userId,
}: ProcessStatusRequest) => {
	await orderApi.put(
		`/${orderId}`,
		{
			paid_at: paid_at,
			state: StateOfOrder.Processing,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)

	const newNoti = await createNotification(adminAccessToken, title, message, orderId)
	return await sendNotification(adminAccessToken, newNoti.id, [userId])
}

export type StatusRequest = {
	adminAccessToken: AdminAccessTokenType
	orderId: string
	title: string
	message: string
	userId: string
	state: StateOfOrder
}

export const updateOrderStatusSendNoti = async ({
	adminAccessToken,
	orderId,
	title,
	message,
	userId,
	state,
}: StatusRequest) => {
	const orderStatusRequest: OrderStatusRequest = {
		orderId: orderId,
		adminAccessToken: adminAccessToken,
		state: state,
		description: message,
	}
	await updateOrderStatus(orderStatusRequest)
	const newNoti = await createNotification(adminAccessToken, title, message, orderId)
	return await sendNotification(adminAccessToken, newNoti.id, [userId])
}

export const getOrderFullDetailAsAdministratorById = async (orderId: OrderData['id']) => {
	const accessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()

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
