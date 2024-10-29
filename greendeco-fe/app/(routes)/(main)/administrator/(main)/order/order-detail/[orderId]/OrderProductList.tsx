import { OrderProductData } from '@/app/_api/axios/order'
import { NOT_FOUND_IMAGE } from '@/app/_configs/constants/images'
import { VARIANT_CURRENCY } from '@/app/_configs/constants/variables'
import Image from 'next/image'

export default function OrderProductList({ productList }: { productList: OrderProductData[] }) {
	return (
		<div className='flex-col-start'>
			<h2 className='border-b-[1px] border-primary-5555-80 pb-cozy text-body-lg font-semi-bold'>
				Order Item List
			</h2>
			<ul className='flex-col-start divide-y divide-primary-5555-40 overflow-y-auto rounded-[4px] '>
				{productList.map((product) => {
					return (
						<li
							className='py-cozy'
							key={product.id}
						>
							<OrderItemInfo product={product} />
						</li>
					)
				})}
			</ul>
		</div>
	)
}

function OrderItemInfo({ product }: { product: OrderProductData }) {
	const { variant_name, product_image, variant_price, quantity } = product
	return (
		<>
			<div className='grid grid-cols-10 gap-cozy'>
				<span className='col-span-6  flex items-center gap-comfortable text-body-md font-semi-bold text-primary-625'>
					<div className='relative aspect-square h-[60px] overflow-hidden rounded-[8px]'>
						<Image
							src={product_image ? product_image : NOT_FOUND_IMAGE}
							alt={variant_name}
							fill
							style={{ objectFit: 'cover' }}
						/>
					</div>
					{variant_name}
				</span>
				<span className=' col-span-2 flex items-center  justify-center '>
					<span className='w-full rounded-[4px] border-[1px] border-primary-625 px-cozy py-compact text-center text-body-sm text-neutral-gray-10'>
						{`${quantity} x ${variant_price} ${VARIANT_CURRENCY}`}
					</span>
				</span>
				<span className='  col-span-2 flex items-center justify-center text-body-sm font-bold text-primary-418'>
					{`${quantity * parseInt(variant_price)} ${VARIANT_CURRENCY}`}
				</span>
			</div>
		</>
	)
}
