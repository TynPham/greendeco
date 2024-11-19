import { FilterParams } from '../app/_types'
import { useQuery } from '@tanstack/react-query'
import productApis from '../apiRequests/product'

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
