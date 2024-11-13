'use client'
import { memo } from 'react'
import clsx from 'clsx'
import { ProductSize } from '@/src/app/_types/product.type'

export type SizeOptionType = {
  label: string
  size: ProductSize
}

export const SIZE_OPTIONS: readonly SizeOptionType[] = [
  { label: 'Small', size: 'S' },
  { label: 'Medium', size: 'M' },
  { label: 'Large', size: 'L' },
  { label: 'Extra Large', size: 'XL' },
]

const SizeOption = memo(function SizeOptionInternal({
  label,
  active,
}: {
  label: string
  active: boolean
}) {
  return (
    <span
      className={clsx('text-nowrap text-primary-5555 transition-all duration-200 ease-in-out', {
        'text-heading-1 font-semi-bold': active,
        'text-body-md font-regular': !active,
      })}
    >
      {label}
    </span>
  )
})

export function ProductSizeSelector({
  activeSize,
  onSizeChange,
}: {
  activeSize: ProductSize
  onSizeChange: (size: ProductSize) => void
}) {
  return (
    <ul className='flex h-16 w-fit items-end justify-center border-b border-primary-5555 pb-cozy'>
      {SIZE_OPTIONS.map((opt) => (
        <li
          className='cursor-pointer px-cozy'
          key={opt.size}
          onClick={() => onSizeChange(opt.size)}
        >
          <SizeOption
            label={opt.label}
            active={opt.size === activeSize}
          />
        </li>
      ))}
    </ul>
  )
}
