import { http } from '../utils/http'
import {
  CartItemListResponseData,
  CartUserResponseData,
  ChangeItemQuantityRequestData,
  ClearItemCartRequestData,
  CreateNewCartResponseData,
  ItemAddData,
  RemoveItemCartRequestData
} from '../types/cart.type'

const cartApis = {
  createNewCart: () =>
    http.post<CreateNewCartResponseData>('/cart', {
      description: 'User Cart'
    }),

  getCartUser: () => http.get<CartUserResponseData>('/cart'),

  getCartItemListFromCartId: (cartId: string) =>
    http.get<CartItemListResponseData>(`/cart/${cartId}/product`),

  addCartItem: (itemData: ItemAddData) =>
    http.post<CartItemListResponseData>('/cart/product', itemData),

  changeCartItemQuantity: ({ itemId, quantity }: ChangeItemQuantityRequestData) =>
    http.put(`/cart/product/${itemId}`, {
      quantity
    }),

  clearCartItemList: ({ cartId }: ClearItemCartRequestData) => http.delete(`/cart/${cartId}/clear`),

  removeCartItem: ({ itemId }: RemoveItemCartRequestData) => http.delete(`/cart/product/${itemId}`)
}

export default cartApis
