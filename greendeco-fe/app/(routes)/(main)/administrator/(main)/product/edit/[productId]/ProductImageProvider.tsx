import { ProductData } from '@/app/_api/axios/product'
import { EditImagesContext, createImagesStore } from '@/app/_configs/store/useEditImageStore'
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
