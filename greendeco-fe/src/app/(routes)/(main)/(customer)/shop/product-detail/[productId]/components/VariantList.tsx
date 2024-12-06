import { DetailContainerProps } from '../ProductDetailContainer'
import { useVariantStore } from '@/src/configs/store/useVariantStore'
import clsx from 'clsx'

const Variant = ({
  id,
  name,
  color,
  color_name,
  onClick
}: {
  id: string
  name: string
  color: string
  color_name: string
  onClick: () => void
}) => {
  const activeVariant = useVariantStore((state) => state.activeVariant)
  const isActive = id === activeVariant.id

  return (
    <div
      className={clsx('flex cursor-pointer items-center gap-[8px] px-cozy first:pl-0', {
        'pointer-events-none': isActive
      })}
      onClick={() => onClick()}
    >
      <span
        className={clsx('h-[30px] w-[40px] rounded-[4px] ', {
          'border-[1px] border-primary-625-60': !isActive,
          'border-[3px] border-primary-625': isActive
        })}
        style={{ backgroundColor: color }}
      ></span>
      <p
        className={clsx('text-body-sm capitalize text-primary-418', {
          'font-semi-bold': isActive
        })}
      >
        {color_name}
      </p>
    </div>
  )
}

export const VariantList = ({
  variantList
}: {
  variantList: DetailContainerProps['variantList']
}) => {
  const setActiveVariant = useVariantStore((state) => state.setActiveVariant)
  return (
    <div className='flex divide-x divide-primary-625'>
      {variantList.map((variant) => (
        <Variant
          onClick={() => setActiveVariant(variant)}
          {...variant}
          key={variant.id}
        />
      ))}
    </div>
  )
}
