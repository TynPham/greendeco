'use client'

import clsx from 'clsx'
import VariantDetailDisplay from './VariantDetailDisplay'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/src/configs/constants/variables'
import { useQueryClient } from '@tanstack/react-query'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import Button from '@/src/components/Button'
import { ProductData, VariantData } from '@/src/types/product.type'
import { useDeleteVariantMutation } from '@/src/queries/product'
import { useRouter } from 'next/navigation'
import path from '@/src/constants/path'

export default function VariantDisplay({
  variantList,
  productId,
  productName
}: {
  variantList: VariantData[]
  productId: ProductData['id']
  productName: ProductData['name']
}) {
  const [currentVariant, setCurrentVariant] = useState<VariantData>(variantList[0])
  useEffect(() => {
    setCurrentVariant(variantList[0])
  }, [variantList])
  return (
    <>
      <div className='mb-comfortable flex  items-center justify-between'>
        <div className=' flex items-center gap-cozy'>
          <h2>Variants</h2>
          <ul className='flex divide-x'>
            {variantList.map((variant) => (
              <li
                key={variant.id}
                onClick={() => setCurrentVariant(variant)}
                className={clsx(' px-cozy first:pl-0 last:pr-0')}
              >
                <VariantListItem
                  {...variant}
                  active={currentVariant.id === variant.id}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className='flex gap-cozy '>
          <Link
            className='btn flex items-center gap-compact'
            href={{
              pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/variant/create`,
              query: {
                productId: productId,
                productName: productName
              }
            }}
          >
            Create A New Variant
            <PlusCircleIcon className='aspect-square h-[24px]' />
          </Link>
          <Link
            className='btn btnSecondary flex items-center gap-compact'
            href={{
              pathname: `${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/variant/edit/${currentVariant.id}`,
              query: {
                productName: productName
              }
            }}
          >
            Edit Variant
            <PencilSquareIcon className='aspect-square h-[24px]' />
          </Link>
          <DeleteVariantButton
            variantId={currentVariant.id}
            productId={productId}
          />
        </div>
      </div>
      <VariantDetailDisplay variant={{ ...currentVariant }} />
    </>
  )
}

const VariantListItem = ({
  active = false,
  color,
  color_name
}: {
  active?: boolean
  color: VariantData['color']
  color_name: VariantData['color_name']
}) => {
  return (
    <div
      className={clsx('group flex items-center gap-[8px]  ', {
        'hover:cursor-pointer': !active,
        'pointer-events-none': active
      })}
    >
      <span
        className={clsx('h-[30px] w-[40px] rounded-[4px]', {
          'border-[4px] border-primary-625': active
        })}
        style={{ backgroundColor: color }}
      ></span>
      <p
        className={clsx('text-body-sm capitalize text-primary-418', {
          'group-hover:font-semi-bold': !active,
          'font-bold': active
        })}
      >
        {color_name}
      </p>
    </div>
  )
}

const DeleteVariantButton = ({
  variantId,
  productId
}: {
  variantId: VariantData['id']
  productId: ProductData['id']
}) => {
  const router = useRouter()
  const deleteVariantMutation = useDeleteVariantMutation(productId)

  const handleDeleteVariant = async () => {
    await deleteVariantMutation.mutateAsync(variantId)
  }
  return (
    <Button
      onClick={handleDeleteVariant}
      className='flex items-center border-status-error bg-status-error-light capitalize text-status-error'
    >
      {deleteVariantMutation.isLoading ? 'Deleting...' : 'Delete'}
      <TrashIcon className='aspect-square h-[24px]' />
    </Button>
  )
}
