import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Create Variant',
	description: 'This is where you can create a variant as an administrator',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
