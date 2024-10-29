import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Login to GreenDeco',
	description: 'Start Login and Shopping Now!',
}

export default function LoginLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
