import { VariantInfoResponseData } from '../app/_types/product.type'
import { http } from '../app/_utils/http'

const productApis = {
  getVariantById: (variantId: string) => {
    return http.get<VariantInfoResponseData>(`variant/${variantId}`)
  },
}

export default productApis
