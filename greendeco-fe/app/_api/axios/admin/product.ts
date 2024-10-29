import axios from 'axios'

const PRODUCT_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}`
const PLANT_CATEGORY_ID = `${process.env.NEXT_PUBLIC_PLANT_CATEGORY_ID}`

import { ProductData, ProductListData, VariantData } from '../product'
import { Sort, SortBy } from '@/app/_configs/constants/paramKeys'

type AdminAccessTokenType = string | undefined

type CreateProductData = Omit<
	ProductData,
	| 'id'
	| 'available'
	| 'is_publish'
	| 'created_at'
	| 'currency'
	| 'default_variant'
	| 'price'
	| 'category'
>

type UpdateProductData = {
	id: string
	available: boolean
	type: string
	images: string[]
	detail: string
	description: string
	size: string
	light: string
	difficulty: string
	water: string
	is_publish: boolean
}

type CreateVariantData = {
	available: boolean
	product_id: string
	name: string
	color: string
	color_name: string
	price: number
	image: string
	description: string
	currency: string
	is_default: boolean
}
type UpdateVariantData = {
	id: string
	available: boolean
	product_id: string
	name: string
	color: string
	color_name: string
	price: number
	image: string
	description: string
	currency: string
	is_default: boolean
}

type CreateProductRequestData = {
	productData: CreateProductData
	adminAccessToken: AdminAccessTokenType
}

type UpdateProductRequestData = {
	productData: UpdateProductData
	adminAccessToken: AdminAccessTokenType
}

type DeleteProductRequestData = {
	productId: ProductData['id']
	adminAccessToken: AdminAccessTokenType
}

type CreateVariantRequestData = {
	variantData: CreateVariantData
	adminAccessToken: AdminAccessTokenType
}

type UpdateVariantRequestData = {
	variantData: UpdateVariantData
	adminAccessToken: AdminAccessTokenType
}

type DeleteVariantRequestData = {
	variantId: VariantData['id']
	adminAccessToken: AdminAccessTokenType
}

type CreateProductResponseData = {
	id: ProductData['id']
}

export const adminProductApi = axios.create({
	baseURL: PRODUCT_URL,
})

adminProductApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getProductListAsAdministrator = async (adminAccessToken: AdminAccessTokenType) => {
	return await adminProductApi
		.get<ProductListData>('/product/all', {
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
			params: {
				limit: 9999,
				sort: Sort.Descending,
				sortBy: SortBy.CreatedAt,
			},
		})
		.then((res) => res.data)
}

export const createProduct = async (data: CreateProductRequestData) => {
	const { productData, adminAccessToken } = data

	return await adminProductApi.post<CreateProductResponseData>(
		'/product',
		{
			category_id: PLANT_CATEGORY_ID,
			...productData,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}

export const updateProduct = async (data: UpdateProductRequestData) => {
	const { productData, adminAccessToken } = data

	const { id, ...restProductData } = productData

	return await adminProductApi.put(
		`/product/${id}`,
		{
			...restProductData,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}

export const deleteProduct = async (data: DeleteProductRequestData) => {
	const { productId, adminAccessToken } = data

	return await adminProductApi.delete(`/product/${productId}`, {
		headers: {
			Authorization: `Bearer ${adminAccessToken}`,
		},
	})
}

export const createVariant = async (data: CreateVariantRequestData) => {
	const { variantData, adminAccessToken } = data

	return await adminProductApi.post<CreateProductResponseData>(
		'/variant',
		{
			...variantData,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}

export const updateVariant = async (data: UpdateVariantRequestData) => {
	const { variantData, adminAccessToken } = data

	const { id, ...restVariantData } = variantData

	return await adminProductApi.put(
		`/variant/${id}`,
		{
			...restVariantData,
		},
		{
			headers: {
				Authorization: `Bearer ${adminAccessToken}`,
			},
		},
	)
}

export const deleteVariant = async (data: DeleteVariantRequestData) => {
	const { variantId, adminAccessToken } = data

	return await adminProductApi.delete(`/variant/${variantId}`, {
		headers: {
			Authorization: `Bearer ${adminAccessToken}`,
		},
	})
}
