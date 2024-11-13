'use client'
import clsx from 'clsx'
import { memo } from 'react'

interface TabItemProps {
  tab: TabOption
  isActive: boolean
  onClick: () => void
}

export type ProductFilterType = 'new' | 'topRated' | 'cheap'

export interface TabOption {
  type: ProductFilterType
  label: string
}

export const TabItem = memo(function TabItem({ tab, isActive, onClick }: TabItemProps) {
  return (
    <li
      className='cursor-pointer px-compact lg:px-cozy'
      onClick={onClick}
    >
      <TabLabel
        label={tab.label}
        active={isActive}
      />
    </li>
  )
})

const TabLabel = memo(function TabLabel({ label, active }: { label: string; active: boolean }) {
  return (
    <h2
      className={clsx('text-neutral-gray-1 transition-all duration-200 ease-in-out', {
        'text-heading-3 font-semi-bold md:text-heading-2 lg:text-heading-1': active,
        'text-body-xsm font-regular md:text-body-sm lg:text-body-md': !active,
      })}
    >
      {label}
    </h2>
  )
})
