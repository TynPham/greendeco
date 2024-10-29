import { useCartMutation, CartListFullDetail } from '@/app/_hooks/useCart'
import CartItem from './CartItem'
import Button from '../Button'
import { getCookie } from 'cookies-next'

export function CartList(props: CartListFullDetail) {
	const { items } = props
	const { clearCartItem } = useCartMutation()

	const handleClearCart = () => {
		const cartId = getCookie('cartId')
		if (cartId) clearCartItem(cartId)
	}

	return (
		<div className='flex-col-start h-full max-h-full gap-compact divide-y divide-primary-5555-60 p-comfortable pt-0 '>
			<Button
				onClick={() => handleClearCart()}
				className='w-fit self-end rounded-none border-none bg-transparent p-0 text-body-sm font-medium text-primary-418 hover:font-semi-bold hover:underline'
			>
				Clear
			</Button>
			<ul className='flex-col-start max-h-full divide-y divide-primary-5555-20  py-cozy '>
				{items.map((item) => (
					<li
						className='py-cozy first:pt-0 last:pb-0'
						key={item.id}
					>
						<CartItem cartItem={{ ...item }} />
					</li>
				))}
			</ul>
		</div>
	)
}
