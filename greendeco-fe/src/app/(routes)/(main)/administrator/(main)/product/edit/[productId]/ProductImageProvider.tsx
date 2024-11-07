import { ProductData } from '@/src/app/_api/axios/product'
import { EditImagesContext, createImagesStore } from '@/src/app/_configs/store/useEditImageStore'
import ProductEditForm from './ProductEditForm'
import { useRef } from 'react'

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
