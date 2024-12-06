'use client'
import Block from '@/src/components/Block'
import { ADMIN_QUERY_KEY } from '@/src/configs/constants/queryKey'
import EditVariantForm from './EditVariantForm'
import { VariantFormLoading } from '../../../loading/VariantLoading'
import { useGetVariantById } from '@/src/queries/product'

export default function VariantManagement({
  params: { variantId }
}: {
  params: {
    variantId: string
  }
}) {
  const { data, isSuccess, isLoading } = useGetVariantById(variantId, ADMIN_QUERY_KEY)
  return (
    <Block>
      {isLoading && <VariantFormLoading />}
      {isSuccess && (
        <>
          <h1>Edit Variant </h1>
          {data && data.data.items && (
            <div className='mt-cozy border-x border-primary-625-80 px-comfortable'>
              <EditVariantForm {...data.data.items} />
            </div>
          )}
        </>
      )}
    </Block>
  )
}
