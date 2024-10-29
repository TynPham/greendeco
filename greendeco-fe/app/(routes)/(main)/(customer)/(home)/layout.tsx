import React from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Welcome to GreenDeco',
	description: 'Welcome to GreenDeco, have fun!',
}

export default function ProductListLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
