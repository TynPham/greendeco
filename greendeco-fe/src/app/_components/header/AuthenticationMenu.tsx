'use client'

import Image from 'next/image'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { UserProfileResponseData } from '@/src/app/_api/axios/user'
import { ArrowLeftOnRectangleIcon, ChevronDownIcon, Cog8ToothIcon } from '@heroicons/react/24/solid'
import Button from '../Button'
import { useRouter } from 'next/navigation'
import { DEFAULT_AVATAR } from '@/src/app/_configs/constants/images'
import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import useClickOutside from '@/src/app/_hooks/useClickOutside'
import { useAppContext } from '@/src/app/_configs/store/useAppContext'
import { User } from '@/src/app/_types/user.type'
import { useLogoutMutation } from '@/src/queries/auth'
import path from '@/src/constants/path'

export default function AuthenticationHandler() {
  const router = useRouter()
  const { user } = useAppContext()

  return (
    <div className='hidden h-full w-[220px] rounded-[8px] bg-primary-625 shadow-18 md:block'>
      {user && <UserSettingMenu user={user} />}
      {!user && (
        <Button
          className='h-full w-full'
          onClick={() => router.push('/login')}
        >
          Login
        </Button>
      )}
    </div>
  )
}

function UserSettingMenu({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false)
  const settingMenuRef = useRef<any>()

  const logoutMutation = useLogoutMutation()

  useClickOutside(settingMenuRef, () => {
    setIsOpen(false)
  })
  const router = useRouter()

  const handleLogOut = async () => {
    await logoutMutation.mutateAsync()
    router.push(path.login)
  }

  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latestWindowY) => {
    const previousWindowY = scrollY.getPrevious()
    if (latestWindowY > previousWindowY && latestWindowY > 90) {
      setIsOpen(false)
    }
  })

  return (
    <div
      ref={settingMenuRef}
      onClick={() => setIsOpen(!isOpen)}
      className='relative h-full w-full'
    >
      <MenuButton {...user} />

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{
              translateY: '-16px',
              opacity: 0,
            }}
            animate={{ opacity: 1, translateY: 0 }}
            exit={{
              opacity: 0,
              translateY: '-16px',
            }}
            transition={{ ease: 'easeInOut', duration: 0.2 }}
            className='absolute inset-x-0 top-[calc(100%+8px)] z-30 rounded-[8px] border-[1px] border-primary-5555-40 bg-white p-compact'
          >
            <MenuItem onClick={() => router.push('/user/setting/profile')}>
              <div className='flex h-full w-full items-center gap-compact'>
                <Cog8ToothIcon className='aspect-square h-[16px]' />
                user setting
              </div>
            </MenuItem>
            <MenuItem onClick={() => handleLogOut()}>
              <div className='flex h-full w-full items-center gap-compact'>
                <ArrowLeftOnRectangleIcon className='aspect-square h-[16px]' />
                log out
              </div>
            </MenuItem>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

function MenuButton({ avatar, firstName, lastName }: UserProfileResponseData) {
  return (
    <span className='flex h-full max-w-full cursor-pointer items-center justify-center gap-compact  px-cozy py-[12px] '>
      <span className='aspect-square h-full overflow-hidden rounded-[100%]'>
        <Image
          width={0}
          height={0}
          sizes='100vw'
          src={avatar ? avatar : DEFAULT_AVATAR}
          alt='user avatar'
        ></Image>
      </span>
      <span className='flex-1 truncate text-body-md font-semi-bold text-white'>
        {firstName} {lastName}
      </span>
      <ChevronDownIcon className='aspect-square h-[24px] text-white' />
    </span>
  )
}

function MenuItem({
  onClick,
  children,
  className,
}: {
  onClick?: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <li
      className={clsx(
        'w-full cursor-pointer rounded-[8px] px-[8px] py-[12px] text-body-sm capitalize hover:bg-primary-5555-20/40',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </li>
  )
}
