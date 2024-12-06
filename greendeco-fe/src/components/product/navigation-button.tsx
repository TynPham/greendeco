'use client'
import { memo } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'

// Constants
const BUTTON_BASE_CLASSES =
  'group absolute top-1/2 z-20 aspect-square -translate-y-1/2 rounded-full border-[2px] border-primary-5555 bg-neutral-gray-1 py-compact text-primary-5555'

const ICON_CLASSES = 'aspect-square h-6 transition duration-100 ease-in lg:h-7'

// Types
type NavigationButtonProps = {
  direction: 'next' | 'prev'
  onClick: () => void
}

export default memo(function NavigationButton({ direction, onClick }: NavigationButtonProps) {
  const Icon = direction === 'next' ? ChevronRightIcon : ChevronLeftIcon
  const positionClasses =
    direction === 'next' ? '-right-6 pl-compact pr-cozy' : '-left-6 pl-cozy pr-compact'
  const hoverClasses =
    direction === 'next' ? 'group-hover:translate-x-[2px]' : 'group-hover:translate-x-[-2px]'

  return (
    <button
      className={clsx(BUTTON_BASE_CLASSES, positionClasses)}
      onClick={onClick}
      aria-label={`${direction} slide`}
    >
      <Icon className={clsx(ICON_CLASSES, hoverClasses)} />
    </button>
  )
})
