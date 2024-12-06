import Footer from '@/src/components/footer'
import Header from '@/src/components/header'
import React from 'react'

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
