import React from 'react'
import SettingTabList from './SettingTabList'

export default function UserSettingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='flex-col-start gap-cozy rounded-[8px] bg-white p-comfortable shadow-30'>
			{/* <SettingTabList /> */}
			{children}
		</div>
	)
}
