import { INVALID_NAME_STRING } from '../configs/constants/variables'
import { FilterParams, Sort, SortBy } from '../types'
import {
  CreateProductData,
  CreateProductResponseData,
  CreateVariantData,
  DefaultVariantResponseData,
  FieldParams,
  ProductByIdResponseData,
  ProductDetailData,
  ProductListData,
  UpdateProductData,
  UpdateVariantData,
  VariantInfoResponseData,
  VariantListResponseData,
  VariantProductData
} from '../types/product.type'
import { http } from '../utils/http'

export const fieldJSONParse = (params: FilterParams) => {
  if (params) {
    const { field, ...restParams } = params
    const fieldJSON = field ? JSON.parse(field) : null
    const availableField: FieldParams = { ...fieldJSON, available: true }
    return { field: availableField, ...restParams }
  }
}

export const fieldJSONParseWithSearchValidation = (params: FilterParams) => {
  if (params) {
    const { field, ...restParams } = params
    const fieldJSON: FieldParams = field ? JSON.parse(field) : null

    const searchResult =
      fieldJSON && fieldJSON?.name && fieldJSON?.name?.length > 2
        ? fieldJSON.name.replace(/ /g, '') //NOTE: / /g is the regex for whitespace
        : INVALID_NAME_STRING

    const fieldAfterSearch: FieldParams = { ...fieldJSON, name: searchResult, available: true }

    return { field: fieldAfterSearch, ...restParams }
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
  },

  getProductListWithSearch: (params?: FilterParams) => {
    let paramAfterJSON
    if (params) {
      paramAfterJSON = fieldJSONParseWithSearchValidation(params)
    }

    return http.get<ProductListData>('/product', {
      params: { ...paramAfterJSON }
    })
  },

  getProductBaseById: (productId: string) => {
    return http.get<ProductByIdResponseData>(`product/${productId}`)
  },

  getVariantsByProductId: (productId: string) => {
    return http.get<VariantListResponseData>(`variant/product/${productId}`)
  },

  getDefaultVariantByProductId: (productId: string) => {
    return http.get<DefaultVariantResponseData>(`variant/default/${productId}`)
  },

  createProduct: (data: CreateProductData) => {
    return http.post<CreateProductResponseData>('/product', {
      category_id: process.env.NEXT_PUBLIC_PLANT_CATEGORY_ID,
      ...data
    })
  },

  updateProduct: (data: UpdateProductData) => {
    const { id, ...restData } = data
    return http.put(`/product/${id}`, {
      ...restData
    })
  },

  deleteProduct: (productId: string) => {
    return http.delete(`/product/${productId}`)
  },

  createVariant: (data: CreateVariantData) => {
    return http.post<{ id: string }>('/variant', {
      ...data
    })
  },

  updateVariant: (data: UpdateVariantData) => {
    const { id, ...restData } = data
    return http.put(`/variant/${id}`, {
      ...restData
    })
  },

  deleteVariant: (variantId: string) => {
    return http.delete(`/variant/${variantId}`)
  }
}

export const getProductDetailById = async (productId: string) => {
  return await Promise.all([
    productApis.getProductBaseById(productId),
    productApis.getVariantsByProductId(productId),
    productApis.getDefaultVariantByProductId(productId)
  ]).then(([product, variants, defaultVariant]) => {
    const responseProduct = product.data.items
    responseProduct.default_variant = defaultVariant.data.items.variant

    const productDetail: ProductDetailData = {
      product: responseProduct,
      variants: variants.data.items
    }
    return productDetail
  })
}

export default productApis
