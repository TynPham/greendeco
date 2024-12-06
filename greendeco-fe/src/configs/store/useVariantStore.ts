import { create } from 'zustand'
import { VariantData } from '../../types/product.type'

type ActiveVariantState = {
  activeVariant: VariantData
  setActiveVariant: (variant: VariantData) => void
}

export const useVariantStore = create<ActiveVariantState>()((set) => ({
  activeVariant: {
    id: '',
    name: '',
    color: '',
    color_name: '',
    image: '',
    price: '',
    product: '',
    currency: '',
    available: false,
    created_at: '',
    updated_at: '',
    description: '',
    quantity: 0
  },
  setActiveVariant: (variant) => set({ activeVariant: variant })
}))
