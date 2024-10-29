import clsx from 'clsx'
import { ProductCardProps } from '.'
import ProductCard from './ProductCard'
import { motion, Variants, AnimatePresence } from 'framer-motion'

type ProductCardsGridProps = {
	productList: ProductCardProps[]
	columns: 3 | 4 | 5
	gap: 'comfortable' | 'cozy' | 'compact'
}
export default function ProductCardsGrid(props: ProductCardsGridProps) {
	const { productList, columns = 4, gap = 'cozy' } = props

	const listVariants: Variants = {
		hidden: {
			opacity: 0.5,
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.25,
			},
		},
	}

	const itemVariants: Variants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { ease: 'easeInOut', duration: 0.35 },
		},
	}
	return (
		<motion.ul
			variants={listVariants}
			initial='hidden'
			animate='visible'
			className={clsx(
				'grid w-full',
				{
					'grid-cols-3': columns === 3,
					'grid-cols-4': columns === 4,
					'grid-cols-5': columns === 5,
				},
				{
					'gap-comfortable': gap === 'comfortable',
					'gap-cozy': gap === 'cozy',
					'gap-compact': gap === 'compact',
				},
			)}
		>
			{productList.map((product) => (
				<motion.li
					variants={itemVariants}
					whileHover={{
						scale: 1.075,
						transition: {
							type: 'spring',
							stiffness: 500,
						},
					}}
					key={product.id}
					className='rounded-[8px]  shadow-38 '
				>
					<ProductCard
						key={product.id}
						product={product}
					/>
				</motion.li>
			))}
		</motion.ul>
	)
}
