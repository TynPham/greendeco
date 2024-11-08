import clsx from 'clsx'
import { ProductCardProps } from '.'
import ProductCard from './ProductCard'
import { useRef } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'

type ProductCardsGridProps = {
  productList: ProductCardProps[]
}
export default function Product(props: ProductCardsGridProps) {
  const { productList } = props
  const swiperRef = useRef<SwiperType>()
  return (
    <>
      <Swiper
        modules={[Navigation]}
        className='relative w-full'
        slidesPerView={2}
        spaceBetween={16}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 3,
          },
        }}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper
        }}
        draggable
      >
        {productList.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
        <NavigationButton
          onClick={() => swiperRef.current?.slidePrev()}
          direction='prev'
        />
        <NavigationButton
          onClick={() => swiperRef.current?.slideNext()}
          direction='next'
        />
      </Swiper>
    </>
  )
}

function NavigationButton({
  direction,
  onClick,
}: {
  direction: 'next' | 'prev'
  onClick: () => void
}) {
  return (
    <button
      className={clsx(
        'group absolute top-[50%] z-20 aspect-square translate-y-[-50%] rounded-[50%] border-[2px] border-primary-5555 bg-neutral-gray-1 py-compact  text-primary-5555',
        {
          'right-[-16px] pl-compact pr-cozy': direction === 'next',
          'left-[-16px] pl-cozy pr-compact': direction === 'prev',
        },
      )}
      onClick={onClick}
    >
      {direction === 'next' ? (
        <ChevronRightIcon className='aspect-square h-[24px] transition duration-100 ease-in group-hover:translate-x-[2px]  lg:h-[28px]' />
      ) : (
        <ChevronLeftIcon className='aspect-square h-[24px] transition duration-100 ease-in group-hover:translate-x-[-2px] lg:h-[28px]' />
      )}
    </button>
  )
}
