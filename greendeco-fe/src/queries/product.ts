import { FilterParams } from '../types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import productApis, { getProductDetailById } from '../apiRequests/product.api'

export const useGetProductList = (params?: FilterParams) => {
  return useQuery({
    queryKey: ['product', ...Object.values(params || {})],
    queryFn: () => productApis.getProductList(params)
  })
}

export const useGetProductListAsAdministrator = () => {
  return useQuery({
    queryKey: ['product', 'admin'],
    queryFn: () => productApis.getProductListAsAdministrator()
  })
}

export const useGetProductListWithSearch = (params?: FilterParams) => {
  return useQuery({
    queryKey: ['product', 'search', ...Object.values(params || {})],
    queryFn: () => productApis.getProductListWithSearch(params)
  })
}

export const useGetProductBaseById = (productId: string, queryKey?: string) => {
  return useQuery({
    queryKey: ['product', productId, queryKey],
    queryFn: () => productApis.getProductBaseById(productId)
  })
}

export const useGetVariantsByProductId = (productId: string, queryKey?: string) => {
  return useQuery({
    queryKey: [queryKey, productId, 'variants'],
    queryFn: () => productApis.getVariantsByProductId(productId)
  })
}

export const useGetVariantById = (variantId: string, queryKey?: string) => {
  return useQuery({
    queryKey: ['variant', variantId, queryKey],
    queryFn: () => productApis.getVariantById(variantId)
  })
}

export const useGetDefaultVariantByProductId = (productId: string, queryKey?: string) => {
  return useQuery({
    queryKey: ['product', productId, 'defaultVariant', queryKey],
    queryFn: () => productApis.getDefaultVariantByProductId(productId)
  })
}

export const useGetProductDetailById = (productId: string, queryKey?: string) => {
  return useQuery({
    queryKey: ['product', productId, queryKey],
    queryFn: () => getProductDetailById(productId)
  })
}

export const useCreateProductMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productApis.createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'product'] })
    }
  })
}

export const useUpdateProductMutation = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productApis.updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'product', productId] })
    }
  })
}

export const useDeleteProductMutation = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productApis.deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'product'] })
      onSuccess && onSuccess()
    }
  })
}

export const useCreateVariantMutation = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productApis.createVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', productId, 'variants'] })
    }
  })
}

export const useUpdateVariantMutation = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productApis.updateVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', productId, 'variants'] })
    }
  })
}

export const useDeleteVariantMutation = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: productApis.deleteVariant,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', productId, 'variants'] })
    }
  })
}
