import reviewApis from '@/src/apiRequests/review.api'
import TopReviewSlider from './top-review-slider'
import { Sort, SortBy } from '@/src/types'
import { ReviewListResponseData } from '@/src/types/review.type'

const REVIEW_QUERY_PARAMS = {
  limit: 5,
  sort: Sort.Descending,
  sortBy: SortBy.CreatedAt,
  star: 5
}

export interface TopReviewProps {}

export default async function TopReview(props: TopReviewProps) {
  let topReviews: ReviewListResponseData = {
    items: [],
    page: 1,
    page_size: 1,
    next: false,
    prev: false
  }
  try {
    const topReviewsResponse = await reviewApis.getAllReviews(REVIEW_QUERY_PARAMS)
    topReviews = topReviewsResponse.data
  } catch (error) {
    return null
  }
  return <TopReviewSlider reviews={topReviews} />
}
