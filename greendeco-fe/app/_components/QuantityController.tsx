import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid'

type QuantityControllerProps = {
	quantity: number
	decrease: () => void
	increase: () => void
}
export default function QuantityController({
	quantity = 1,
	decrease,
	increase,
}: QuantityControllerProps) {
	return (
		<div className='flex h-fit items-center rounded-[4px] border-[1px] border-primary-625-40 text-body-xsm'>
			<button
				className='rounded-[4px] p-[8px] hover:bg-primary-5555/10'
				onClick={decrease}
			>
				<MinusIcon className='aspect-square h-[12px]' />
			</button>
			<span className='px-[8px]'>{quantity}</span>
			<button
				className='rounded-[4px] p-[8px] hover:bg-primary-5555/10'
				onClick={increase}
			>
				<PlusIcon className='aspect-square h-[12px]' />
			</button>
		</div>
	)
}
