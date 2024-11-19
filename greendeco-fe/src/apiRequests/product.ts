import { FilterParams, Sort, SortBy } from '../app/_types'
import { FieldParams, ProductListData, VariantInfoResponseData } from '../app/_types/product.type'
import { http } from '../app/_utils/http'

export const fieldJSONParse = (params: FilterParams) => {
  if (params) {
    const { field, ...restParams } = params
    const fieldJSON = field ? JSON.parse(field) : null
    const availableField: FieldParams = { ...fieldJSON, available: true }
    return { field: availableField, ...restParams }
  }
}

const productApis = {
  getVariantById: (variantId: string) => {
    return http.get<VariantInfoResponseData>(`variant/${variantId}`)
  },

  getProductList: (params?: FilterParams) => {
    let paramAfterJSON
    if (params) {
      paramAfterJSON = fieldJSONParse(params)
    }

    return http.get<ProductListData>('/product', {
      params: { ...paramAfterJSON }
    })
  },

  getProductListAsAdministrator: () => {
    return http.get<ProductListData>('/product/all', {
      params: {
        limit: 9999,
        sort: Sort.Descending,
        sortBy: SortBy.CreatedAt
      }
    })
  }
}

export default productApis
