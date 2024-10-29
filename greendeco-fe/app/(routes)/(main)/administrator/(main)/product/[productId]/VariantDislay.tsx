import { ProductData, VariantData } from '@/app/_api/axios/product'
import clsx from 'clsx'
import VariantDetailDisplay from './VariantDetailDisplay'
import { useState } from 'react'
import Link from 'next/link'
import { ADMINISTRATOR_ROUTE } from '@/app/_configs/constants/variables'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { deleteVariant } from '@/app/_api/axios/admin/product'
import { ADMIN_QUERY_KEY, UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { PencilSquareIcon, PlusCircleIcon, TrashIcon } from '@heroicons/react/24/solid'
import Button from '@/app/_components/Button'
import { getCookie } from 'cookies-next'
import { ADMIN_ACCESS_TOKEN_COOKIE_NAME } from '@/app/_configs/constants/cookies'

export default function VariantDisplay({
	variantList,
	productId,
	productName,
}: {
	variantList: VariantData[]
	productId: ProductData['id']
	productName: ProductData['name']
}) {
	const [currentVariant, setCurrentVariant] = useState<VariantData>(variantList[0])
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
								productName: productName,
							},
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
								productName: productName,
							},
						}}
					>
						Edit Variant
						<PencilSquareIcon className='aspect-square h-[24px]' />
					</Link>
					<DeleteVariantButton variantId={currentVariant.id} />
				</div>
			</div>
			<VariantDetailDisplay variant={{ ...currentVariant }} />
		</>
	)
}

const VariantListItem = ({
	active = false,
	color,
	color_name,
}: {
	active?: boolean
	color: VariantData['color']
	color_name: VariantData['color_name']
}) => {
	return (
		<div
			className={clsx('group flex items-center gap-[8px]  ', {
				'hover:cursor-pointer': !active,
				'pointer-events-none': active,
			})}
		>
			<span
				className={clsx('h-[30px] w-[40px] rounded-[4px]', {
					'border-[4px] border-primary-625': active,
				})}
				style={{ backgroundColor: color }}
			></span>
			<p
				className={clsx('text-body-sm capitalize text-primary-418', {
					'group-hover:font-semi-bold': !active,
					'font-bold': active,
				})}
			>
				{color_name}
			</p>
		</div>
	)
}

const DeleteVariantButton = ({ variantId }: { variantId: VariantData['id'] }) => {
	const queryClient = useQueryClient()
	const deleteVariantMutation = useMutation({
		mutationFn: deleteVariant,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: [UseQueryKeys.Variant, ADMIN_QUERY_KEY] })
		},
	})

	const handleDeleteVariant = () => {
		const adminAccessToken = getCookie(ADMIN_ACCESS_TOKEN_COOKIE_NAME)?.toString()
		deleteVariantMutation.mutate({
			variantId: variantId,
			adminAccessToken: adminAccessToken,
		})
	}
	return (
		<Button
			onClick={handleDeleteVariant}
			className='flex items-center border-status-error bg-status-error-light capitalize text-status-error'
		>
			delete
			<TrashIcon className='aspect-square h-[24px]' />
		</Button>
	)
}
