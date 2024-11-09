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
