import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Product',
	description: 'This is where you can create a product as an administrator',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
