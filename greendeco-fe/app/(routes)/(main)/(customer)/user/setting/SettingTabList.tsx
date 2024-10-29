'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import clsx from 'clsx'

type SettingTab = {
	label: string
	path: string
}

const settingTabList: SettingTab[] = [
	{
		path: 'profile',
		label: 'Profile',
	},
	{
		path: 'changepassword',
		label: 'Change Password',
	},
	{
		path: 'address',
		label: 'Shipping Address',
	},
]

export default React.memo(function SettingTabList() {
	return (
		<div
			className='
            flex w-full items-center gap-cozy rounded-[8px] bg-primary-625 p-compact
            '
		>
			{settingTabList.map((tab) => (
				<Tab
					key={tab.label}
					path={tab.path}
					label={tab.label}
				/>
			))}
		</div>
	)
})

const Tab = React.memo(function Tab({ label, path }: SettingTab) {
	const currentPath = usePathname()

	return (
		<Link
			href={`./${path}`}
			className={clsx('flex w-full justify-center rounded-[4px]  p-compact font-bold', {
				' bg-primary-625  text-neutral-gray-1 hover:bg-white/30 ':
					currentPath.includes(path) === false,
				'pointer-events-none cursor-auto cursor-pointer bg-white text-primary-625':
					currentPath.includes(path),
			})}
		>
			<label className='cursor-pointer text-body-sm uppercase'>{label}</label>
		</Link>
	)
})
