'use client'

import Button from '@/app/_components/Button'
import { useVariantStore } from '@/app/_configs/store/useVariantStore'
import { useCartMutation } from '@/app/_hooks/useCart'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { getCookie } from 'cookies-next'
import { ThreeDots } from 'react-loader-spinner'
export default function Price() {
	const { price, currency, id, available } = useVariantStore((state) => state.activeVariant)

	const { addCartItem } = useCartMutation()
	const handleAddCartItem = () => {
		const cartId = getCookie('cartId')?.toString()
		addCartItem.handle(cartId, 1, id)
	}

	return (
		<div className='flex items-center justify-between rounded-[8px] bg-primary-625 px-comfortable py-cozy'>
			<span className='text-[3rem] font-semi-bold text-white'>{`${price} ${currency}`}</span>
			<div>
				<Button
					onClick={() => handleAddCartItem()}
					disabled={addCartItem.loading || !available}
					className='btnSecondary group disabled:border-neutral-gray-1 disabled:bg-transparent disabled:opacity-90'
				>
					{addCartItem.loading ? (
						<span className='flex items-center gap-compact group-disabled:text-neutral-gray-1'>
							Adding
							<ThreeDots
								visible={true}
								height='24px'
								width='32px'
								color='#fff'
								radius='9'
								ariaLabel='three-dots-loading'
								wrapperClass='text-white'
							/>
						</span>
					) : available ? (
						<div className='flex items-center gap-[4px]'>
							<span className='font-semi-bold'>Add to cart</span>
							<ShoppingCartIcon className='aspect-square w-[24px]' />
						</div>
					) : (
						<div className='flex items-center gap-[4px] text-neutral-gray-1'>
							<span className='font-semi-bold'>This item is out of stock</span>
						</div>
					)}
				</Button>
			</div>
		</div>
	)
}
