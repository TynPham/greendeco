'use client'

import UserProfileForm from './UserProfileForm'
import { useAppContext } from '@/src/configs/store/useAppContext'

export default function UserProfilePage() {
  const { user } = useAppContext()
  return (
    <div className='flex-col-start gap-compact'>
      <h1 className='text-heading-3'>Account Preference</h1>
      <div className='p-cozy'>{user && <UserProfileForm profile={user} />}</div>
    </div>
  )
}
