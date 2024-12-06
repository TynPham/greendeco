import { ProductData } from '../types/product.type'
import {
  CreateProductReviewData,
  ReviewListResponseData,
  ReviewSortParams
} from '../types/review.type'
import { http } from '../utils/http'

const reviewApis = {
  getAllReviews: (params?: ReviewSortParams) =>
    http.get<ReviewListResponseData>('/review/all', {
      params
    }),

  getReviewListByProductId: (productId: ProductData['id'], params?: ReviewSortParams) =>
    http.get<ReviewListResponseData>(`/review/product/${productId}`, {
      params
    }),

  createProductReview: (data: CreateProductReviewData) => http.post('/review', { ...data })
}

export default reviewApis
