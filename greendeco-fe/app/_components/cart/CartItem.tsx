'use client'

import Image from 'next/image'
import { VariantData } from '@/app/_api/axios/product'
import { useCartMutation, CartItemWithFullVariantInfo } from '@/app/_hooks/useCart'
import clsx from 'clsx'
import { TrashIcon } from '@heroicons/react/24/solid'
import Button from '../Button'
import QuantityController from '../QuantityController'

export default function CartItem({ cartItem }: { cartItem: CartItemWithFullVariantInfo }) {
	const { variant, quantity, id } = cartItem

	const { changeQuantity, removeCartItem } = useCartMutation()

	return (
		<div className='flex gap-cozy'>
			<ItemImage
				imageSrc={variant.image}
				name={variant.name}
			/>
			<div className='flex-col-start flex-1 justify-between'>
				<ItemDetail {...variant} />
				<div className='flex items-center justify-between'>
					<div
						className={clsx({
							'pointer-events-none opacity-90': changeQuantity.loading,
						})}
					>
						<QuantityController
							quantity={quantity}
							decrease={() => changeQuantity.decrease(id, quantity)}
							increase={() => changeQuantity.increase(id, quantity)}
						/>
					</div>
					<Button
						className='w-fit rounded-[6px] bg-primary-5555 p-compact'
						onClick={() => removeCartItem(id)}
					>
						<TrashIcon className='aspect-square h-[16px] text-white' />
					</Button>
				</div>
			</div>
		</div>
	)
}

function ItemImage({
	imageSrc,
	name,
}: {
	imageSrc: VariantData['image']
	name: VariantData['name']
}) {
	return (
		<div className='relative aspect-square w-[120px] overflow-hidden rounded-[8px]'>
			<Image
				src={imageSrc}
				fill
				style={{ objectFit: 'fill' }}
				alt={name}
			/>
		</div>
	)
}

function ItemDetail({ name, color, color_name, price, currency }: VariantData) {
	return (
		<div>
			<div className='mb-[4px] flex text-primary-418'>
				<span className='flex-1 text-body-sm '>{name}</span>
				<span className='text-body-sm font-semi-bold'>
					{price} {currency}
				</span>
			</div>
			<div className='flex items-center gap-compact text-body-xsm'>
				<span className='text-primary-418'>Pot:</span>
				<div className='flex items-center gap-compact'>
					<span
						className='aspect-square h-[24px] rounded-[100%]'
						style={{ backgroundColor: `${color}` }}
					/>
					<span className='capitalize text-primary-418'>{color_name}</span>
				</div>
			</div>
		</div>
	)
}
