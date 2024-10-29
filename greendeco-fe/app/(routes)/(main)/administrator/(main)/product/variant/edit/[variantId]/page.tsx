'use client'
import Block from '@/app/_components/Block'
import useQueryParams from '@/app/_hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { UseQueryKeys, ADMIN_QUERY_KEY } from '@/app/_configs/constants/queryKey'
import { getVariantById } from '@/app/_api/axios/product'
import EditVariantForm from './EditVariantForm'
import { VariantFormLoading } from '../../../loading/VariantLoading'

export default function VariantManagement({
	params: { variantId },
}: {
	params: {
		variantId: string
	}
}) {
	const variantQuery = useQuery({
		queryKey: [ADMIN_QUERY_KEY, UseQueryKeys.Variant, variantId],
		queryFn: () => getVariantById(variantId),
	})

	const { data, isSuccess, isLoading, isError } = variantQuery
	return (
		<Block>
			{isLoading && <VariantFormLoading />}
			{isSuccess && (
				<>
					<h1>Edit Variant </h1>
					{data && data.items && (
						<div className='mt-cozy border-x-[1px] border-primary-625-80 px-comfortable'>
							<EditVariantForm {...data.items} />
						</div>
					)}
				</>
			)}
		</Block>
	)
}
