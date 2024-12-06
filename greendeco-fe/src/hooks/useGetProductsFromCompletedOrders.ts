import productApis from '@/src/apiRequests/product.api'
import { AxiosError } from 'axios'
import { NOT_FOUND_STATUS } from '../configs/constants/status'
import { OrderState } from '../configs/constants/paramKeys'
import { FilterParams } from '../types'
import { ProductData } from '../types/product.type'
import orderApis from '@/src/apiRequests/order.api'
import { OrderListData, OrderProductList } from '../types/order.type'

export const useGetProductsFromCompletedOrders = () => {
  const completedOrderParams: FilterParams = {
    limit: 9999,
    field: JSON.stringify({
      state: OrderState.Completed
    })
  }

  const getOrderListWithItem = async (orderList: OrderListData['items']) => {
    return Promise.all(
      orderList.map(async (order) => {
        return await orderApis.getOrderProductListById(order.id).then((data) => data.data)
      })
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
        return await productApis
          .getProductBaseById(productId)
          //NOTE: Return undefined if the product ID is invalid or not
          //found
          .then((data) => {
            if (data) return data.data.items
          })
      })
    )
  }

  const handleGetProductsFromCompletedOrders = async () => {
    return await orderApis
      .getOrderList(completedOrderParams)
      .then((orderList) => {
        if (orderList.data.page_size > 0) {
          return getOrderListWithItem(orderList.data.items)
        }
        //NOTE: If the user does not have any completed orders
        else throw new AxiosError('Not Found', NOT_FOUND_STATUS.toString())
      })
      .then((orderListWithItems) => getAllProductIdFromOrderList(orderListWithItems))
      //NOTE: Filter out the duplicate product ids
      .then((productIdList) => {
        return productIdList.filter(
          (productId, index) => productIdList.indexOf(productId) === index
        )
      })
      .then((productIdListAfterFiltering) => getProductDetailsList(productIdListAfterFiltering))
      //NOTE: Filter out the undefined object
      .then((productDetaiList) => {
        return productDetaiList.filter((product): product is ProductData => !!product)
      })
      .then((result) => result)
  }

  return {
    getProductsFromCompletedOrders: handleGetProductsFromCompletedOrders
  }
}
