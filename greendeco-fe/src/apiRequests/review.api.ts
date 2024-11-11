import { ReviewListResponseData, ReviewSortParams } from '../app/_types/review.type'
import { http } from '../app/_utils/http'

const reviewApis = {
  getAllReviews: (params?: ReviewSortParams) =>
    http.get<ReviewListResponseData>('/review/all', {
      params,
    }),
}

export default reviewApis
