import { ReactNode } from 'react'
import { create } from 'zustand'

type ModalState = {
	activeDialog: ReactNode

	openDialog: (dialog: ReactNode) => void
	closeDialog: () => void
}

export const useDialogStore = create<ModalState>()((set) => ({
	activeDialog: undefined,
	openDialog: (dialog) => set({ activeDialog: dialog }),
	closeDialog: () => set({ activeDialog: undefined }),
}))
