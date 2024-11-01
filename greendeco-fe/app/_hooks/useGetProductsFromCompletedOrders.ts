import { AxiosError } from 'axios'
import {
	OrderListData,
	OrderProductList,
	getOrderListByUser,
	getOrderProductListById,
} from '../_api/axios/order'
import { FilterParams, ProductData, getProductBaseById } from '../_api/axios/product'
import { BAD_REQUEST_STATUS, NOT_FOUND_STATUS } from '../_configs/constants/status'
import { OrderState } from '../_configs/constants/paramKeys'

export const useGetProductsFromCompletedOrders = () => {
	const completedOrderParams: FilterParams = {
		limit: 9999,
		field: JSON.stringify({
			state: OrderState.Completed,
		}),
	}

	const getOrderListWithItem = async (orderList: OrderListData['items']) => {
		return Promise.all(
			orderList.map(async (order) => {
				return await getOrderProductListById(order.id)
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
		return await getOrderListByUser(completedOrderParams)
			.then((orderList) => {
				if (orderList.page_size > 0) {
					return getOrderListWithItem(orderList.items)
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
