import Footer from '@/src/app/_components/footer'
import Header from '@/src/app/_components/header'
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
