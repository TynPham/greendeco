import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Edit Variant',
	description: 'This is where you can edit variant information as an administrator',
}

export default function ManageProductLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
