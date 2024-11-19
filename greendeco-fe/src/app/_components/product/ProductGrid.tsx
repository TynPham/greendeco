import clsx from 'clsx'
import { ProductCardProps } from '.'
import ProductCard from './ProductCard'
import { motion, Variants } from 'framer-motion'

type ProductCardsGridProps = {
  productList: ProductCardProps[]
}

export default function ProductCardsGrid({ productList }: ProductCardsGridProps) {
  const listVariants: Variants = {
    hidden: {
      opacity: 0.5
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { ease: 'easeInOut', duration: 0.35 }
    }
  }

  return (
    <motion.ul
      variants={listVariants}
      initial='hidden'
      animate='visible'
      className={clsx(
        'grid w-full',
        'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
        'gap-8'
      )}
    >
      {productList.map((product) => (
        <motion.li
          variants={itemVariants}
          whileHover={{
            scale: 1.025,
            transition: {
              type: 'spring',
              stiffness: 500
            }
          }}
          key={product.id}
          className='rounded-[8px] shadow-38'
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
