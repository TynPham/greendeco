import { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Email Sent Successfully!',
	description: 'Please receive our reset password link via your email',
}

export default function EmailSentSuccessfullyLayout({ children }: { children: ReactNode }) {
	return <>{children}</>
}
