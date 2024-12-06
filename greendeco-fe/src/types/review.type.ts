import { Sort } from '.'
import { ProductData } from './product.type'
import { UserProfileResponseData } from './user.type'

export type ReviewSortParams = {
  limit: number
  offSet?: number
  sort?: Sort.Ascending | Sort.Descending
  sortBy?: string
  star?: number
  user_id?: string
}

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
