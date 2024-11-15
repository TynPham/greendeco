'use client'
import Block from '@/src/app/_components/Block'
import ProductTable from './ProductTable'
import Button from '@/src/app/_components/Button'
import { useRouter } from 'next/navigation'
import { ADMINISTRATOR_ROUTE } from '@/src/app/_configs/constants/variables'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'
import { useGetProductListAsAdministrator } from '@/src/queries/product'

export default function ProductManagementPage() {
  const router = useRouter()
  const productQuery = useGetProductListAsAdministrator()

  const { data } = productQuery

  const dataMemo = useMemo(() => data?.data, [data])

  return (
    <div className='min-h-screen py-comfortable'>
      <Block>
        <div className='mb-cozy flex items-center justify-between'>
          <h1>Manage Product</h1>
          <Button
            className='flex items-center gap-compact'
            onClick={() => router.push(`${ADMINISTRATOR_ROUTE.PRODUCT.LINK}/create`)}
          >
            Create
            <PlusCircleIcon className='aspect-square h-[24px]' />
          </Button>
        </div>
        {dataMemo && <ProductTable product={dataMemo?.items} />}
      </Block>
    </div>
  )
}
