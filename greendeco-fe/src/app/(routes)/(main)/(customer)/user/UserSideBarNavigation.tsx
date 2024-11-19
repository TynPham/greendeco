'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {
  UserIcon,
  TruckIcon,
  TicketIcon,
  BellIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/solid'
import clsx from 'clsx'
import useActivePath from '@/src/app/_hooks/useActivePath'

type UserNavigation = {
  label: string
  path: string
  icon?: React.ReactNode
}

const userNavigationList: UserNavigation[] = [
  {
    path: '/setting/profile',
    label: 'Account Settings',
    icon: <UserIcon className='aspect-square w-[24px]' />
  },
  {
    path: '/order',
    label: 'Order list',
    icon: <TruckIcon className='aspect-square w-[24px]' />
  },
  {
    path: '/purchased',
    label: 'Purchased Products',
    icon: <HandThumbUpIcon className='aspect-square w-[24px]' />
  }
]

export default React.memo(function UserSidebarNavigation() {
  return (
    <ul className='flex-col-start sticky top-away-from-header gap-compact rounded-[8px] border-y border-l border-primary-625-20  bg-white p-8 shadow-38'>
      {userNavigationList.map((nav) => (
        <li key={nav.label}>
          <Navigation
            path={nav.path}
            icon={nav.icon}
            label={nav.label}
          />
        </li>
      ))}
    </ul>
  )
})

const Navigation = React.memo(function Navigation({ label, path, icon }: UserNavigation) {
  const rootPath = '/user'
  const { isPathActive } = useActivePath()

  return (
    <Link
      href={rootPath + path}
      scroll
      className={clsx('group flex w-full items-center  gap-compact rounded-[8px] p-cozy ', {
        'cursor-pointer text-primary-625 transition duration-75 ease-linear hover:bg-primary-580-20/80 hover:font-semibold':
          isPathActive(`${rootPath}${path}`) === false,
        'pointer-events-none cursor-auto bg-primary-625 font-bold text-neutral-gray-1':
          isPathActive(`${rootPath}${path}`) === true
      })}
    >
      {icon}
      <label className='text-body-sm capitalize group-hover:cursor-pointer'>{label}</label>
    </Link>
  )
})
