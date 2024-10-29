import axios from 'axios'
import { ProductData } from './product'
import { UserProfileResponseData } from './user'
import { Sort } from '@/app/_configs/constants/paramKeys'
import { getCookie } from 'cookies-next'
import { ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'

const REVIEW_URL = `${process.env.NEXT_PUBLIC_GREENDECO_BACKEND_API}/review`

export type ReviewItemData = {
	id: string
	user_id: UserProfileResponseData['id']
	product_id: ProductData['id']
	content: string
	star: number
	firstName: UserProfileResponseData['firstName']
	lastName: UserProfileResponseData['lastName']
	avatar: UserProfileResponseData['avatar']
	created_at: string
}

export type ReviewListResponseData = {
	items: ReviewItemData[]
	page: number
	page_size: number
	next: boolean
	prev: boolean
}

export type CreateProductReviewData = {
	content: string
	product_id: ProductData['id']
	star: number
}

export type ReviewSortParams = {
	limit: number
	offSet?: number
	sort?: Sort.Ascending | Sort.Descending
	sortBy?: string
	star?: number
	user_id?: string
}

export const reviewApi = axios.create({
	baseURL: REVIEW_URL,
})

reviewApi.defaults.headers.common['Content-Type'] = 'application/json'

export const getReviewListByProductId = async (
	productId: ProductData['id'],
	params?: ReviewSortParams,
) => {
	return await reviewApi
		.get<ReviewListResponseData>(`/product/${productId}`, {
			params: params ? { ...params } : null,
		})
		.then((res) => res.data)
}

export const getAllReviews = async (params?: ReviewSortParams) => {
	return await reviewApi
		.get<ReviewListResponseData>(`/all`, {
			params: params ? { ...params } : null,
		})
		.then((res) => res.data)
}

export const createProductReview = async (data: CreateProductReviewData) => {
	const accessToken = getCookie(ACCESS_TOKEN_COOKIE_NAME)?.toString()

	return await reviewApi.post(
		'',
		{ ...data },
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	)
}
