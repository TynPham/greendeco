'use client'

import AdministratorSidebar from '@/app/(routes)/(main)/administrator/Sidebar'
import { useDialogStore } from '@/app/_configs/store/useDialogStore'

export default function useSidebar() {
	const { openDialog } = useDialogStore()

	const openSidebar = () => {
		openDialog(<AdministratorSidebar />)
	}

	return { openSidebar: openSidebar }
}
