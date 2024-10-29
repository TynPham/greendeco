import React from 'react'
import type { Metadata } from 'next'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Footer from '@/app/_components/footer'

export const metadata: Metadata = {
	title: 'Payment Unsuccessful',
	description: 'Do not worry, you can make payment later in your order detail',
}

export default function PaymentSuccessLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<main className='h-screen max-h-screen w-screen  '>
				<div className='flex-col-start h-full w-full items-center bg-status-error/70 '>
					{children}
				</div>
			</main>
			<Footer />
		</>
	)
}
