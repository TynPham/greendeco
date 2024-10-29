import { createStore } from 'zustand'
import { EMPTY_STRING } from '../constants/variables'

import { createContext } from 'react'

interface ImagesProps {
	images: string[]
}
const initialImageUploadState: ImagesProps['images'] = [EMPTY_STRING, EMPTY_STRING, EMPTY_STRING]

interface ImagesState extends ImagesProps {
	setImages: () => void
	replaceImages: (image: string, position: number) => void
}

type ImagesStore = ReturnType<typeof createImagesStore>

export const createImagesStore = (initProps?: Partial<ImagesProps>) => {
	const DEFAULT_PROPS: ImagesProps = {
		images: [...initialImageUploadState],
	}

	return createStore<ImagesState>()((set, get) => ({
		...DEFAULT_PROPS,
		...initProps,
		setImages: () => set((state) => ({ images: state.images })),
		replaceImages: (image, position) => {
			const newImages = replaceImage(get().images, image, position)
			set({ images: newImages })
		},
	}))
}

function replaceImage(imageArray: string[], replaceImage: string, replacePosition: number) {
	const newArray = [...imageArray]

	newArray.splice(replacePosition, 1, replaceImage)

	return newArray
}

export const EditImagesContext = createContext<ImagesStore | null>(null)
