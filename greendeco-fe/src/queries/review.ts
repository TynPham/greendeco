import { ReviewSortParams } from '../types/review.type'
import { ProductData } from '../types/product.type'
import { useMutation, useQuery } from '@tanstack/react-query'
import reviewApis from '../apiRequests/review.api'

export const useGetReviewListByProductIdQuery = (
  productId: ProductData['id'],
  params?: ReviewSortParams
) => {
  return useQuery({
    queryKey: ['review', productId, ...Object.values(params || {})],
    queryFn: () => reviewApis.getReviewListByProductId(productId, params)
  })
}

export const useCreateProductReviewMutation = () => {
  return useMutation({
    mutationFn: reviewApis.createProductReview
  })
}
