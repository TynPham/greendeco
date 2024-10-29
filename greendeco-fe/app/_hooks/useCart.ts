'use client'

import {
	getCartInfoFromUser,
	getCartItemListFromCartId,
	createNewCart,
	changeCartItemQuantity,
	removeCartItem,
	CartInfoData,
	clearCartItemList,
	CartItemListResponseData,
	addCartItem,
} from '../_api/axios/cart'
import { VariantData, getVariantById } from '../_api/axios/product'
import { getCookie } from 'cookies-next'
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { ACCESS_TOKEN_COOKIE_NAME } from '../_configs/constants/cookies'
import { AxiosError } from 'axios'
import { AccessTokenType } from '../_types'
import { CartItemData } from '../_api/axios/cart'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import useCartDialog from './dialog/useCartDialog'
import { CONFLICT_STATUS, NOT_FOUND_STATUS, UNAUTHORIZE_STATUS } from '../_configs/constants/status'
import { UseQueryKeys } from '../_configs/constants/queryKey'

export type CartItemWithFullVariantInfo = {
	id: CartItemData['id']
	cart: CartInfoData['id']
	variant: VariantData
	quantity: number
	created_at: string
	updated_at: string
}

export type CartListFullDetail = {
	items: CartItemWithFullVariantInfo[]
	page: number
	page_size: number
	next: Boolean
	prev: Boolean
}

//NOTE: Go through the cartList to get Variant full information by Id
export const handleGetCartFullDetail = async (cartList: CartItemListResponseData) => {
	const fullInfoCartList = cartList.items.map(async (item) => {
		const variantInfo = await getVariantById(item.variant).then((data) => data)
		const itemWithVariantInfo: CartItemWithFullVariantInfo = {
			...item,
			variant: variantInfo.items,
		}
		return itemWithVariantInfo
	})

	//NOTE: Invoke the Promise[] to get the CartItemWithFullVariantInfo[]
	return await Promise.all(fullInfoCartList).then((cartItemArray) => {
		const cartListFullDetail: CartListFullDetail = {
			...cartList,
			items: cartItemArray,
		}
		return cartListFullDetail
	})
}

export function useCartQuery() {
	const router = useRouter()

	//NOTE: Handle getCartId - if there isn't any cart -> create new one
	const handleGetCartId = async (accessToken: AccessTokenType) => {
		return await getCartInfoFromUser(accessToken)
			.then((data) => data.items.id)
			.catch((e: AxiosError) => {
				if (e.response?.status === NOT_FOUND_STATUS) {
					return createNewCart(accessToken).then((newCartId) => newCartId.id)
				}
			})
			.then((cartId) => {
				setCookie('cartId', cartId, {
					sameSite: 'none',
					secure: true,
				})
				return cartId
			})
	}

	const getCartListWithFullDetail = async () => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		return await handleGetCartId(accessToken)
			.then((cartId) => {
				if (cartId) return getCartItemListFromCartId(cartId, accessToken)
			})
			.then((cartListWithoutVariantInfo) => {
				if (cartListWithoutVariantInfo) {
					return handleGetCartFullDetail(cartListWithoutVariantInfo)
				}
			})
	}

	const cartQuery = useQuery({
		queryKey: [UseQueryKeys.User, 'cart'],
		queryFn: getCartListWithFullDetail,
		onError: () => {},
	})

	return {
		cartQuery: { ...cartQuery },
	}
}
export function useCartMutation() {
	const queryClient = useQueryClient()
	const { openCart } = useCartDialog()
	const router = useRouter()

	const addCartItemMutation = useMutation({
		mutationFn: addCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
			openCart()
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				e.response?.status === CONFLICT_STATUS && openCart()
				e.response?.status === UNAUTHORIZE_STATUS && router.push('/login')
			}
		},
	})

	const changeQuantityMutation = useMutation({
		mutationFn: changeCartItemQuantity,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				e.response?.status === UNAUTHORIZE_STATUS && router.push('/login')
			}
		},
	})

	const removeCartItemMutation = useMutation({
		mutationFn: removeCartItem,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				e.response?.status === UNAUTHORIZE_STATUS && router.push('/login')
			}
		},
	})

	const clearCartItemMutation = useMutation({
		mutationFn: clearCartItemList,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.User, 'cart'] })
		},
		onError: (e) => {
			if (e instanceof AxiosError) {
				e.response?.status === UNAUTHORIZE_STATUS && router.push('/login')
			}
		},
	})

	const handleAddCartItem = (
		cart_id: CartInfoData['id'] | undefined,
		quantity: CartItemData['quantity'],
		variant_id: VariantData['id'],
	) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

		if (cart_id && accessToken) {
			addCartItemMutation.mutate({
				itemData: {
					variant_id: variant_id,
					cart_id: cart_id,
					quantity: quantity,
				},
				accessToken: accessToken,
			})
		} else {
			router.replace('/login')
		}
	}

	const handleIncreaseQuantity = (
		itemId: CartItemData['id'],
		quantity: CartItemData['quantity'],
	) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

		changeQuantityMutation.mutate({
			itemId: itemId,
			quantity: quantity + 1,
			accessToken: accessToken,
		})
	}

	const handleDecreaseQuantity = (
		itemId: CartItemData['id'],
		quantity: CartItemData['quantity'],
	) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()
		if (quantity > 1)
			changeQuantityMutation.mutate({
				itemId: itemId,
				quantity: quantity - 1,
				accessToken: accessToken,
			})
		if (quantity === 1) {
			handleRemoveCartItem(itemId)
		}
	}

	const handleRemoveCartItem = (itemId: CartItemData['id']) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		removeCartItemMutation.mutate({
			itemId: itemId,
			accessToken: accessToken,
		})
	}

	const handleClearCartList = (cartId: string) => {
		const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)
		clearCartItemMutation.mutate({
			cartId: cartId,
			accessToken: accessToken,
		})
	}

	return {
		addCartItem: {
			handle: handleAddCartItem,
			loading: addCartItemMutation.isLoading,
		},

		changeQuantity: {
			increase: handleIncreaseQuantity,
			decrease: handleDecreaseQuantity,
			loading: changeQuantityMutation.isLoading,
		},
		removeCartItem: handleRemoveCartItem,
		clearCartItem: handleClearCartList,
	}
}
