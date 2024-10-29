import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Edit Product',
	description: 'This is where you can edit a product information as an administrator',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
