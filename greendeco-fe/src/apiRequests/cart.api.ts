import { http } from '../app/_utils/http'
import {
  CartItemListResponseData,
  CartUserResponseData,
  CreateNewCartResponseData
} from '../app/_types/cart'

const cartApis = {
  createNewCart: () =>
    http.post<CreateNewCartResponseData>('/cart', {
      description: 'User Cart'
    }),

  getCartUser: () => http.get<CartUserResponseData>('/cart'),

  getCartItemListFromCartId: (cartId: string) =>
    http.get<CartItemListResponseData>(`/cart/${cartId}/product`)
}

export default cartApis
