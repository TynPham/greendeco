import { ProductData } from '@/app/_api/axios/product'
import Image from 'next/image'
import Button from '@/app/_components/Button'
import { MagnifyingGlassIcon, StarIcon } from '@heroicons/react/24/solid'
import useCreateProductReviewDialog from '@/app/_hooks/dialog/useCreateReviewDialog'
import { useRouter } from 'next/navigation'
import { SHOP_ROUTE } from '@/app/_configs/constants/variables'

export default function PurchasedProductList({ productList }: { productList: ProductData[] }) {
	return (
		<ul className=' grid gap-cozy lg:grid-cols-2  '>
			{productList.map((product) => (
				<li key={product.id}>
					<Item product={product} />
				</li>
			))}
		</ul>
	)
}

const Item = ({ product }: { product: ProductData }) => {
	const { images, name, id } = product
	return (
		<div className='flex w-full gap-compact overflow-hidden rounded-[16px] border-[1px] border-primary-580-60 bg-neutral-gray-1 shadow-18'>
			<ItemImage imageSrc={images[0]} />
			<div className='flex-col-start flex-1 justify-between p-cozy '>
				<ItemDetail name={name} />
				<ItemButtons productId={id} />
			</div>
		</div>
	)
}

function ItemImage({ imageSrc }: { imageSrc: string }) {
	return (
		<div className='relative aspect-square w-[140px] overflow-hidden  '>
			<Image
				src={imageSrc}
				fill
				style={{ objectFit: 'fill' }}
				alt='purchased product image'
			/>
		</div>
	)
}
function ItemDetail({ name }: { name: ProductData['name'] }) {
	return <span className='text-body-md font-semi-bold text-primary-418'>{name}</span>
}

function ItemButtons({ productId }: { productId: ProductData['id'] }) {
	const router = useRouter()
	const { openCreateProductReviewDialog } = useCreateProductReviewDialog({
		productId: productId,
	})

	return (
		<div className='flex items-center justify-between gap-cozy'>
			<Button
				type='button'
				onClick={() => openCreateProductReviewDialog()}
				className='flex  flex-1 items-center justify-center gap-[4px] text-body-sm font-semi-bold'
			>
				Review
				<StarIcon className='aspect-square h-[16px]' />
			</Button>
			<Button
				onClick={() => router.push(`${SHOP_ROUTE.PRODUCT_DETAIL.LINK}/${productId}`)}
				type='button'
				className='btnSecondary flex flex-1 items-center justify-center gap-[4px] text-body-sm font-semi-bold'
			>
				View
				<MagnifyingGlassIcon className='aspect-square h-[16px]' />
			</Button>
		</div>
	)
}
