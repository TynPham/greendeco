import { EditImagesContext, createImagesStore } from '@/src/configs/store/useEditImageStore'
import ProductEditForm from './ProductEditForm'
import { useRef } from 'react'
import { ProductData } from '@/src/types/product.type'

export default function EditFormContainer(product: ProductData) {
  const imagesStore = useRef(createImagesStore({ images: product.images })).current
  return (
    <>
      <EditImagesContext.Provider value={imagesStore}>
        <ProductEditForm {...product} />
      </EditImagesContext.Provider>
    </>
  )
}
