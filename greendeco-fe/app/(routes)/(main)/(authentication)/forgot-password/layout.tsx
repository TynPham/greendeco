import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Forgot Password',
	description: 'Send us your email to begin reset your password',
}

export default function ForgotPasswordLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
