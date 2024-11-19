import { VariantData } from '@/src/app/_api/axios/product'
import { create } from 'zustand'

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
    description: ''
  },
  setActiveVariant: (variant) => set({ activeVariant: variant })
}))
