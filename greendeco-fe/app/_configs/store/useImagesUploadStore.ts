import { create } from 'zustand'
import { EMPTY_STRING } from '../constants/variables'

type imageUploadState = {
	images: string[]
	setImages: (images: string[]) => void
	replaceImages: (image: string, position: number) => void
	isFulfilled: () => boolean
	resetImages: () => void
}

const initialImageUploadState: imageUploadState['images'] = [
	EMPTY_STRING,
	EMPTY_STRING,
	EMPTY_STRING,
]

export const useImageUploadStore = create<imageUploadState>()((set, get) => ({
	images: [...initialImageUploadState],
	setImages: (images) => set({ images: images }),
	replaceImages: (image, position) => {
		const newImages = replaceImage(get().images, image, position)
		set({ images: newImages })
	},
	isFulfilled: () => {
		return get().images.every((image) => image !== 'empty')
	},
	resetImages: () => set({ images: [...initialImageUploadState] }),
}))

function replaceImage(imageArray: string[], replaceImage: string, replacePosition: number) {
	const newArray = [...imageArray]

	newArray.splice(replacePosition, 1, replaceImage)

	return newArray
}
