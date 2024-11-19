import React from 'react'
import UserSidebarNavigation from './UserSideBarNavigation'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen w-screen bg-primary-580-20 pb-[40px] pt-away-from-header'>
      <div className='container'>
        <div className='grid grid-cols-8 gap-comfortable'>
          <div className='col-span-8 md:col-span-3 xl:col-span-2'>
            <UserSidebarNavigation />
          </div>
          <div className='col-span-8 md:col-span-5 xl:col-span-6'>{children}</div>
        </div>
      </div>
    </div>
  )
}
