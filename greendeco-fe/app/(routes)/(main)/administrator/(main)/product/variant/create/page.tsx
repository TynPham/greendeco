'use client'
import Block from '@/app/_components/Block'
import CreateVariantForm from './CreateVariantForm'
import useQueryParams from '@/app/_hooks/useQueryParams'

export default function VariantManagement() {
	const { queryParams } = useQueryParams()
	const productId = queryParams.get('productId')
	const productName = queryParams.get('productName')
	return (
		<Block>
			<h1>Create Variant For {productName}</h1>
			{productId && productName && (
				<div className='mt-cozy border-x-[1px] border-primary-625-80 px-comfortable'>
					<CreateVariantForm
						productId={productId}
						productName={productName}
					/>
				</div>
			)}
		</Block>
	)
}
