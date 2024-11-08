'use client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import {
  ChatBubbleBottomCenterTextIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from '@heroicons/react/24/solid'
import Image from 'next/image'
import { Swiper as SwiperType } from 'swiper'
import { useRef, useState } from 'react'
import clsx from 'clsx'
import { useQuery } from '@tanstack/react-query'
import { UseQueryKeys } from '@/src/app/_configs/constants/queryKey'
import { ReviewItemData, getAllReviews } from '@/src/app/_api/axios/reviews'
import { Sort, SortBy } from '@/src/app/_configs/constants/paramKeys'
import { DEFAULT_AVATAR } from '@/src/app/_configs/constants/images'
import formatDate from '@/src/app/_hooks/useFormatDate'

// Constants
const SWIPER_CONFIG = {
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    300: { slidesPerView: 1 },
    1024: { slidesPerView: 2, spaceBetween: 30 },
  },
  initialSlide: 1,
  centeredSlides: true,
  speed: 800,
} as const

const REVIEW_QUERY_PARAMS = {
  limit: 5,
  sort: Sort.Descending,
  sortBy: SortBy.CreatedAt,
  star: 5,
} as const

// Customer Info Component
function CustomerInfo({
  avatar,
  firstName,
  lastName,
}: Pick<ReviewItemData, 'avatar' | 'firstName' | 'lastName'>) {
  return (
    <div className='flex gap-cozy'>
      <span className='relative aspect-square h-[60px] overflow-hidden rounded-[100%] bg-primary-5555'>
        <Image
          src={avatar ?? DEFAULT_AVATAR}
          alt='customer avatar'
          fill
          style={{ objectFit: 'cover' }}
        />
      </span>
      <div className='flex-col-start gap-compact'>
        <span className='text-body-md font-semi-bold text-primary-625'>
          {`${firstName} ${lastName}`}
        </span>
        <span className='text-body-sm text-primary-418'>Customer</span>
      </div>
    </div>
  )
}

// Star Rating Component
function StarRating({ star, created_at }: Pick<ReviewItemData, 'star' | 'created_at'>) {
  return (
    <div className='flex items-center gap-compact'>
      <div className='flex text-status-success'>
        {[...Array(star)].map((_, index) => (
          <StarIcon
            key={index}
            className='aspect-square h-[40px]'
          />
        ))}
      </div>
      <span className='text-body-xsm italic text-primary-418-60'>
        {formatDate(new Date(created_at))}
      </span>
    </div>
  )
}

// Review Item Component
function ReviewItem({ active, review }: { active?: boolean; review: ReviewItemData }) {
  return (
    <div
      className={clsx(
        'flex-col-start w-full gap-compact rounded-[16px] border-[2px] border-primary-5555 bg-neutral-gray-1 p-comfortable transition-all duration-[0.8s] ease-in-out',
        { 'scale-90 opacity-30': !active },
      )}
    >
      <div className='flex justify-between'>
        <CustomerInfo {...review} />
        <ChatBubbleBottomCenterTextIcon className='aspect-square h-[40px] text-primary-5555' />
      </div>
      <div className='flex-col-start gap-compact'>
        <StarRating
          star={review.star}
          created_at={review.created_at}
        />
        <p className='text-body-md text-primary-418'>{review.content}</p>
      </div>
    </div>
  )
}

// Navigation Button Component
function NavigationButton({
  direction,
  onClick,
}: {
  direction: 'next' | 'prev'
  onClick: () => void
}) {
  const Icon = direction === 'next' ? ChevronRightIcon : ChevronLeftIcon
  const translateClass = direction === 'next' ? 'translate-x-[2px]' : 'translate-x-[-2px]'

  return (
    <button
      className='group aspect-square rounded-[50%] bg-primary-625 p-compact text-neutral-gray-1'
      onClick={onClick}
    >
      <Icon
        className={clsx(
          'aspect-square h-[20px] transition duration-100 ease-in',
          `group-hover:${translateClass}`,
        )}
      />
    </button>
  )
}

// Main Component
export default function TopReviewSlider() {
  const swiperRef = useRef<SwiperType>()
  const [activeIndex, setActiveIndex] = useState<number>()

  const { data } = useQuery({
    queryKey: [UseQueryKeys.Review],
    queryFn: () => getAllReviews(REVIEW_QUERY_PARAMS),
  })

  if (!data) return null

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      className='items-center py-comfortable'
      {...SWIPER_CONFIG}
      pagination={{ clickable: true }}
      onSlideChange={() => setActiveIndex(swiperRef.current?.activeIndex)}
      onBeforeInit={(swiper) => {
        swiperRef.current = swiper
      }}
      draggable
    >
      {data.items.map((review, i) => (
        <SwiperSlide key={review.id}>
          <ReviewItem
            active={i === activeIndex}
            review={review}
          />
        </SwiperSlide>
      ))}
      <div className='mt-4 flex w-full justify-center gap-common'>
        <NavigationButton
          onClick={() => swiperRef.current?.slidePrev()}
          direction='prev'
        />
        <NavigationButton
          onClick={() => swiperRef.current?.slideNext()}
          direction='next'
        />
      </div>
    </Swiper>
  )
}
