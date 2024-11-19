import { ProductData } from './product'
import { UserProfileResponseData } from './user'
import { Sort } from '@/src/app/_configs/constants/paramKeys'
import { http } from '@/src/app/_utils/http'

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

export const getReviewListByProductId = async (
  productId: ProductData['id'],
  params?: ReviewSortParams
) => {
  return await http
    .get<ReviewListResponseData>(`/review/product/${productId}`, {
      params: params ? { ...params } : null
    })
    .then((res) => res.data)
}

export const getAllReviews = async (params?: ReviewSortParams) => {
  return await http
    .get<ReviewListResponseData>(`/review/all`, {
      params: params ? { ...params } : null
    })
    .then((res) => res.data)
}

export const createProductReview = async (data: CreateProductReviewData) => {
  return await http.post('/review', { ...data })
}
