'use client'

import useCartDialog from '@/app/_hooks/dialog/useCartDialog'
import { useCartQuery } from '@/app/_hooks/useCart'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

export default function CartDisplayButton() {
	const router = useRouter()

	const { cartQuery } = useCartQuery()
	const { openCart } = useCartDialog()

	const { isSuccess, isError, data } = cartQuery

	const handleCartButtonOnClick = () => {
		if (isSuccess) openCart()
		if (isError) router.push('/login')
	}

	return (
		<button
			onClick={handleCartButtonOnClick}
			className='group relative rounded-xl border-[1px] border-primary-5555-40 bg-primary-5555-20/40 px-[8px] py-[4px] text-primary-625 transition duration-75 ease-in hover:bg-primary-625 hover:text-neutral-gray-1'
		>
			{isSuccess && CartAmountDisplay(data?.page_size)}
			<ShoppingCartIcon className='aspect-square h-[24px] ' />
		</button>
	)
}

function CartAmountDisplay(amount: number | undefined) {
	if (amount && amount > 0)
		return (
			<span className='absolute right-[-4px] top-[-4px] flex aspect-square h-[16px] items-center justify-center rounded-[100%] border-[1px] border-primary-625 bg-primary-625 font-semi-bold text-white transition duration-75  ease-in group-hover:bg-white group-hover:text-primary-625'>
				{amount}
			</span>
		)
}
