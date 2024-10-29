import { AccessTokenType } from '@/app/_types'
import axios from 'axios'
import { UserProfileResponseData } from './user'
import { VariantData } from './product'

const CART_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/cart`

export type CartInfoData = {
	id: string
	owner: UserProfileResponseData['id']
	description: string
	created_at: string
	updated_at: string
}

type CartInfoFromUserResponseData = {
	items: CartInfoData
	page: number
	page_size: number
	next: Boolean
	prev: Boolean
}

type CreateNewCartResponseData = {
	id: CartInfoData['id']
}

export type CartItemData = {
	id: string
	cart: CartInfoData['id']
	variant: VariantData['id']
	quantity: number
	created_at: string
	updated_at: string
}

export type CartItemListResponseData = {
	items: CartItemData[]
	page: number
	page_size: number
	next: Boolean
	prev: Boolean
}

type AddItemRequestData = {
	itemData: ItemAddData
	accessToken: AccessTokenType
}

type ItemAddData = {
	cart_id: CartInfoData['id']
	quantity: number
	variant_id: VariantData['id']
}

type AddItemResponseData = {
	id: CartItemData['id']
}

type ChangeItemQuantityRequestData = {
	itemId: CartItemData['id']
	quantity: number
	accessToken: AccessTokenType
}

type RemoveItemCartRequestData = {
	itemId: CartItemData['id']
	accessToken: AccessTokenType
}

type ClearItemCartResquestData = {
	cartId: CartInfoData['id']
	accessToken: AccessTokenType
}

export const cartApi = axios.create({
	baseURL: CART_URL,
})

cartApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getCartInfoFromUser = async (accessToken: AccessTokenType) => {
	return await cartApi
		.get<CartInfoFromUserResponseData>('', {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const createNewCart = async (accessToken: AccessTokenType) => {
	return await cartApi
		.post<CreateNewCartResponseData>(
			'',
			{
				//NOTE: In the future, the description will have username + Cart
				description: 'User Cart',
			},
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			},
		)
		.then((res) => res.data)
}

export const getCartItemListFromCartId = async (cartId: string, accessToken: AccessTokenType) => {
	return await cartApi
		.get<CartItemListResponseData>(`/${cartId}/product`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		.then((res) => res.data)
}

export const addCartItem = async (data: AddItemRequestData) => {
	const { itemData, accessToken } = data
	return await cartApi.post<CartItemListResponseData>(
		'/product',
		{ ...itemData },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}

export const changeCartItemQuantity = async (data: ChangeItemQuantityRequestData) => {
	const { itemId, quantity, accessToken } = data
	return await cartApi.put(
		`/product/${itemId}`,
		{
			quantity: quantity,
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}

export const removeCartItem = async (data: RemoveItemCartRequestData) => {
	const { itemId, accessToken } = data
	return await cartApi.delete(`/product/${itemId}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
}

export const clearCartItemList = async (data: ClearItemCartResquestData) => {
	const { cartId, accessToken } = data
	return await cartApi.delete(`/${cartId}/clear`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	})
}
