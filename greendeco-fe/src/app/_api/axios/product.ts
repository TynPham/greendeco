import { INVALID_NAME_STRING } from '@/src/app/_configs/constants/variables'
import { http } from '@/src/app/_utils/http'

export type ProductData = {
  id: string
  category: string
  name: string
  price: string
  size: string
  available: boolean
  is_publish: boolean
  type: string
  images: string[]
  detail: string
  description: string
  light: string
  difficulty: string
  water: string
  created_at: string
  default_variant: string
  currency: string
}

export type ProductByIdResponseData = {
  items: ProductData
  page: string
  page_size: string
  next: string
  prev: string
}

export type ProductListData = {
  items: ProductData[]
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type VariantData = {
  id: string
  available: boolean
  product: string
  name: string
  color: string
  color_name: string
  price: string
  image: string
  description: string
  currency: string
  created_at: string
  updated_at: string
}

export type VariantListResponseData = {
  items: VariantData[]
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type DefaultVariantResponseData = {
  items: {
    variant: string
  }
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type VariantInfoResponseData = {
  items: VariantData
  next: boolean
  page: number
  page_size: number
  prev: boolean
}
export type ProductDetailData = {
  product: ProductData
  variants: VariantData[]
}

export type VariantProductData = {
  product: ProductData
  variant: VariantData
}

export type FilterParams = {
  limit?: number
  offSet?: number
  sort?: 'asc' | 'desc'
  sortBy?: string
  field?: string
} | null

export type FieldParams = {
  name?: string
  size?: string
  difficulty?: string
  price?: string
  available?: boolean
  type?: string
  water?: string
  light?: string
} | null

export const fieldJSONParse = (params: FilterParams) => {
  if (params) {
    const { field, ...restParms } = params
    const fieldJSON = field ? JSON.parse(field) : null
    const availableField: FieldParams = { ...fieldJSON, available: true }
    return { field: availableField, ...restParms }
  }
}

export const fieldJSONParseWithSearchValidation = (params: FilterParams) => {
  if (params) {
    const { field, ...restParms } = params
    const fieldJSON: FieldParams = field ? JSON.parse(field) : null

    const searchResult =
      fieldJSON && fieldJSON?.name && fieldJSON?.name?.length > 2
        ? fieldJSON.name.replace(/ /g, '') //NOTE: / /g is the regex for whitespace
        : INVALID_NAME_STRING

    const fieldAfterSearch: FieldParams = { ...fieldJSON, name: searchResult, available: true }

    return { field: fieldAfterSearch, ...restParms }
  }
}

export const getProductList = async (params?: FilterParams) => {
  let paramAfterJSON
  if (params) {
    paramAfterJSON = fieldJSONParse(params)
  }

  return await http
    .get<ProductListData>('/product', {
      params: { ...paramAfterJSON },
    })
    .then((res) => res.data)
}

export const getProductListWithSearch = async (params?: FilterParams) => {
  let paramAfterJSON
  if (params) {
    paramAfterJSON = fieldJSONParseWithSearchValidation(params)
  }

  return await http
    .get<ProductListData>('/product', {
      params: { ...paramAfterJSON },
    })
    .then((res) => res.data)
}

export const getProductBaseById = async (productId: string) => {
  return await http.get<ProductByIdResponseData>(`product/${productId}`).then((res) => res.data)
}

export const getVariantsByProductId = async (productId: string) => {
  return await http
    .get<VariantListResponseData>(`variant/product/${productId}`)
    .then((res) => res.data)
}
export const getDefaultVariantByProductId = async (productId: string) => {
  return await http
    .get<DefaultVariantResponseData>(`variant/default/${productId}`)
    .then((res) => res.data.items.variant)
}

export const getVariantById = async (variantId: string) => {
  return await http.get<VariantInfoResponseData>(`variant/${variantId}`).then((res) => res.data)
}

export const getProductDetailById = async (productId: string) => {
  return await Promise.all([
    getProductBaseById(productId),
    getVariantsByProductId(productId),
    getDefaultVariantByProductId(productId),
  ]).then(([product, variants, defaultVariant]) => {
    const responseProduct = product.items
    responseProduct.default_variant = defaultVariant

    const productDetail: ProductDetailData = {
      product: responseProduct,
      variants: variants.items,
    }
    return productDetail
  })
}

// use for get product for variant
export const getProductVariant = async (productId: string, variantId: string) => {
  return await Promise.all([getProductBaseById(productId), getVariantById(variantId)])
    .then(([product, variant]) => {
      const productRes = product.items
      const variantRes = variant.items
      const productDetail: VariantProductData = {
        product: productRes,
        variant: variantRes,
      }
      console.log('productDetail', productDetail)
      return productDetail
    })
    .catch((e) => {
      console.log('error:')
      return undefined
    })
}
