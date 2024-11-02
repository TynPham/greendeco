import { ProductData, ProductListData, VariantData } from '../product'
import { Sort, SortBy } from '@/app/_configs/constants/paramKeys'
import { clientToken, http } from '@/app/_utils/http'

const PLANT_CATEGORY_ID = `${process.env.NEXT_PUBLIC_PLANT_CATEGORY_ID}`

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

export const getProductListAsAdministrator = async () => {
	return await http
		.get<ProductListData>('/product/all', {
			params: {
				limit: 9999,
				sort: Sort.Descending,
				sortBy: SortBy.CreatedAt,
			},
		})
		.then((res) => res.data)
}

export const createProduct = async (data: CreateProductRequestData) => {
	const { productData } = data

	return await http.post<CreateProductResponseData>('/product', {
		category_id: PLANT_CATEGORY_ID,
		...productData,
	})
}

export const updateProduct = async (data: UpdateProductRequestData) => {
	const { productData } = data

	const { id, ...restProductData } = productData

	return await http.put(`/product/${id}`, {
		...restProductData,
	})
}

export const deleteProduct = async (data: DeleteProductRequestData) => {
	const { productId } = data

	return await http.delete(`/product/${productId}`)
}

export const createVariant = async (data: CreateVariantRequestData) => {
	const { variantData } = data

	return await http.post<CreateProductResponseData>('/variant', {
		...variantData,
	})
}

export const updateVariant = async (data: UpdateVariantRequestData) => {
	const { variantData } = data

	const { id, ...restVariantData } = variantData

	return await http.put(`/variant/${id}`, {
		...restVariantData,
	})
}

export const deleteVariant = async (data: DeleteVariantRequestData) => {
	const { variantId } = data

	return await http.delete(`/variant/${variantId}`)
}
