import React from 'react'
import type { Metadata } from 'next'
import { CheckBadgeIcon } from '@heroicons/react/24/outline'
import Footer from '@/src/components/footer'

export const metadata: Metadata = {
  title: 'Thank you for shopping at GreenDeco!',
  description: 'Thank you for choosing us. Have a nice day'
}

export default function PaymentSuccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='h-screen max-h-screen w-screen  '>
        <div className='flex-col-start size-full items-center bg-status-success '>{children}</div>
      </main>
      <Footer />
    </>
  )
}
