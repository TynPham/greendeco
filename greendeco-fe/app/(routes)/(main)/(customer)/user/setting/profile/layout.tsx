import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Profile Setting',
	description: 'User Profile Setting Page',
}

export default function ProfileSettingLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
