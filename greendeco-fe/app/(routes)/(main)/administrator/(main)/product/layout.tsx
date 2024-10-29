import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Product Management',
	description: 'This is where you can view your product list as an administrator',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
