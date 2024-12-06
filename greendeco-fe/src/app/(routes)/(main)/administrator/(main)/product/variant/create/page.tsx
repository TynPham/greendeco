'use client'
import Block from '@/src/components/Block'
import CreateVariantForm from './CreateVariantForm'
import useQueryParams from '@/src/hooks/useQueryParams'

export default function VariantManagement() {
  const { queryParams } = useQueryParams()
  const productId = queryParams.get('productId')
  const productName = queryParams.get('productName')
  return (
    <Block>
      <h1>Create Variant For {productName}</h1>
      {productId && productName && (
        <div className='mt-cozy border-x border-primary-625-80 px-comfortable'>
          <CreateVariantForm
            productId={productId}
            productName={productName}
          />
        </div>
      )}
    </Block>
  )
}
