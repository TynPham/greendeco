'use client'

import Image from 'next/image'
import Link from 'next/link'
import BrandLogoSmall from '@/public/BrandLogoSmall.svg'
import AuthenticationHandler from './AuthenticationMenu'
import CartDisplayButton from './CartDisplayButton'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState } from 'react'
import NotificationDisplayButton from './NotificationButton'
import SearchDisplayButton from './SearchDisplayButton'
import AuthenticationDisplayButton from './AuthenticationDisplayButton'
import { useAppContext } from '@/src/app/_configs/store/useAppContext'

export default function Header() {
  const [hidden, setHidden] = useState(false)

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latestWindowY) => {
    const previousWindowY = scrollY.getPrevious()
    if (latestWindowY > previousWindowY && latestWindowY > 90) {
      setHidden(true)
    } else setHidden(false)
  })
  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: '-140%' }
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className='sticky top-cozy z-50'
      >
        <div className='container px-2 sm:px-10'>
          <div className='mt-[-60px] flex h-[60px] items-center gap-2 sm:gap-cozy'>
            <Logo />
            <NavBar />
            <AuthenticationHandler />
          </div>
        </div>
      </motion.header>
    </>
  )
}

function Logo() {
  return (
    <Link
      href={'/'}
      className='relative aspect-square h-full shrink-0 overflow-hidden rounded-[8px] bg-primary-625 p-compact shadow-18'
    >
      <Image
        src={BrandLogoSmall}
        alt='Welcome to GreenDeco'
        width={0}
        height={0}
        sizes='100vw'
      />
    </Link>
  )
}

function NavBar() {
  const { user } = useAppContext()
  return (
    <div className='flex-col-start relative h-full flex-1 justify-center rounded-[8px] border border-primary-625 bg-white px-4 shadow-18 sm:px-cozy'>
      <div className='flex items-center justify-between'>
        <NavigationList />
        <div className='flex items-center gap-compact'>
          <SearchDisplayButton />
          {user && <CartDisplayButton />}
          {user && <NotificationDisplayButton />}
          <AuthenticationDisplayButton />
        </div>
      </div>
    </div>
  )
}

function NavigationList() {
  return (
    <ul className='flex list-none text-body-sm text-primary-625'>
      <li>
        <Link
          href={'/shop'}
          className='px-cozy text-primary-625'
        >
          Plants
        </Link>
      </li>
      <li className='hidden sm:block'>
        <Link
          href={'/'}
          className='px-cozy text-primary-625'
        >
          About Us
        </Link>
      </li>
    </ul>
  )
}
