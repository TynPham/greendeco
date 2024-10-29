import { AxiosError } from 'axios'
import {
	OrderListData,
	OrderProductList,
	getOrderDetailById,
	getOrderListByUser,
	getOrderProductListById,
} from '../_api/axios/order'
import {
	FilterParams,
	ProductData,
	getProductBaseById,
	getProductDetailById,
} from '../_api/axios/product'
import {
	BAD_REQUEST_STATUS,
	NOT_FOUND_STATUS,
	UNAUTHORIZE_STATUS,
} from '../_configs/constants/status'
import { OrderState } from '../_configs/constants/paramKeys'
import { AccessTokenType } from '../_types'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '../_configs/constants/cookies'

const testDataString = [
	'61284b33-2d63-4459-8203-bd56eba4c5e9',
	'1',
	'2e7689e3-0765-42cc-bb33-94d0bb4f35a3',
	'2',
]

export const useGetProductsFromCompletedOrders = () => {
	const completedOrderParams: FilterParams = {
		limit: 9999,
		field: JSON.stringify({
			state: OrderState.Completed,
		}),
	}

	const getOrderListWithItem = async (
		orderList: OrderListData['items'],
		token: AccessTokenType,
	) => {
		return Promise.all(
			orderList.map(async (order) => {
				return await getOrderProductListById(order.id, token)
			}),
		)
	}

	const getAllProductIdFromOrderList = (orderListWithItems: OrderProductList[]) => {
		const productIdList = orderListWithItems
			.map((order) => {
				return order.items.map((item) => {
					return item.product_id
				})
			})

			//NOTE: The result will be an order array with each element is an
			//product id array
			//NOTE: Join all the Product ID arrays from each order element into one 1D Array
			.join()
			.split(',')
			.filter((productId) => productId.length > 0)

		return productIdList
	}

	const getProductDetailsList = (productIdList: ProductData['id'][]) => {
		return Promise.all(
			productIdList.map(async (productId) => {
				return await getProductBaseById(productId)
					//NOTE: Return undefined if the product ID is invalid or not
					//found
					.catch((e) => {
						if (e instanceof AxiosError && e.response?.status === BAD_REQUEST_STATUS) {
							return
						}
					})
					.then((data) => {
						if (data) return data.items
					})
			}),
		)
	}

	const handleGetProductsFromCompletedOrders = async () => {
		const userAccessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

		if (!userAccessToken) throw new AxiosError('Unauthorized', UNAUTHORIZE_STATUS.toString())

		return await getOrderListByUser(completedOrderParams, userAccessToken)
			.then((orderList) => {
				if (orderList.page_size > 0) {
					return getOrderListWithItem(orderList.items, userAccessToken)
				}
				//NOTE: If the user does not have any completed orders
				else throw new AxiosError('Not Found', NOT_FOUND_STATUS.toString())
			})
			.then((orderListWithItems) => getAllProductIdFromOrderList(orderListWithItems))
			//NOTE: Filter out the duplicate product ids
			.then((productIdList) => {
				return productIdList.filter(
					(productId, index) => productIdList.indexOf(productId) === index,
				)
			})
			.then((productIdListAfterFiltering) =>
				getProductDetailsList(productIdListAfterFiltering),
			)
			//NOTE: Filter out the undefined object
			.then((productDetaiList) => {
				return productDetaiList.filter((product): product is ProductData => !!product)
			})
			.then((result) => result)
	}

	return {
		getProductsFromCompletedOrders: handleGetProductsFromCompletedOrders,
	}
}
