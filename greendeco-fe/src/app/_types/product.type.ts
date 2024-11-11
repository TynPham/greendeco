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
