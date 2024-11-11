import reviewApis from '@/src/apiRequests/review.api'
import TopReviewSlider from './top-review-slider'
import { Sort, SortBy } from '@/src/app/_types'

const REVIEW_QUERY_PARAMS = {
  limit: 5,
  sort: Sort.Descending,
  sortBy: SortBy.CreatedAt,
  star: 5,
} as const

export interface TopReviewProps {}

export default async function TopReview(props: TopReviewProps) {
  let topReviews = await reviewApis.getAllReviews(REVIEW_QUERY_PARAMS)
  return <TopReviewSlider reviews={topReviews.data} />
}
