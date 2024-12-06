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
  quantity: number
}

export type VariantInfoResponseData = {
  items: VariantData
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

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

export type ProductListData = {
  items: ProductData[]
  next: boolean
  page: number
  page_size: number
  prev: boolean
}

export type ProductSize = 'S' | 'M' | 'L' | 'XL'

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

export type ProductByIdResponseData = {
  items: ProductData
  page: string
  page_size: string
  next: string
  prev: string
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

export type ProductDetailData = {
  product: ProductData
  variants: VariantData[]
}

export type VariantProductData = {
  product: ProductData
  variant: VariantData
}

export type CreateProductData = Omit<
  ProductData,
  | 'id'
  | 'available'
  | 'is_publish'
  | 'created_at'
  | 'currency'
  | 'default_variant'
  | 'price'
  | 'category'
>

export type CreateProductResponseData = {
  id: ProductData['id']
}

export type UpdateProductData = {
  id: string
  available: boolean
  type: string
  images: string[]
  detail: string
  description: string
  size: string
  light: string
  difficulty: string
  water: string
  is_publish: boolean
}

export type CreateVariantData = {
  available: boolean
  product_id: string
  name: string
  color: string
  color_name: string
  price: number
  image: string
  description: string
  currency: string
  is_default: boolean
  quantity: number
}

export type UpdateVariantData = {
  id: string
  available: boolean
  product_id: string
  name: string
  color: string
  color_name: string
  price: number
  image: string
  description: string
  currency: string
  is_default: boolean
  quantity: number
}
