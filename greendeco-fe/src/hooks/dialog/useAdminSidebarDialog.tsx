'use client'

import AdministratorSidebar from '@/src/app/(routes)/(main)/administrator/Sidebar'
import { useDialogStore } from '@/src/configs/store/useDialogStore'

export default function useSidebar() {
  const { openDialog } = useDialogStore()

  const openSidebar = () => {
    openDialog(<AdministratorSidebar />)
  }

  return { openSidebar: openSidebar }
}
