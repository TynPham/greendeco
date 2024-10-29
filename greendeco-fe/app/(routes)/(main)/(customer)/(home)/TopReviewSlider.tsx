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
import { UseQueryKeys } from '@/app/_configs/constants/queryKey'
import { ReviewItemData, getAllReviews } from '@/app/_api/axios/reviews'
import { Sort, SortBy } from '@/app/_configs/constants/paramKeys'
import { DEFAULT_AVATAR } from '@/app/_configs/constants/images'
import formatDate from '@/app/_hooks/useFormatDate'

export default function TopReviewSlider() {
	const swiperRef = useRef<SwiperType>()
	const [activeIndex, setActiveIndex] = useState<number | undefined>()

	const customerReview = useQuery({
		queryKey: [UseQueryKeys.Review],
		queryFn: () =>
			getAllReviews({
				limit: 5,
				sort: Sort.Descending,
				sortBy: SortBy.CreatedAt,
				star: 5,
			}),
	})

	const { data } = customerReview

	return (
		<>
			{data && (
				<Swiper
					modules={[Navigation, Autoplay]}
					className='items-center py-comfortable'
					autoplay={{
						delay: 3000,
						disableOnInteraction: false,
					}}
					initialSlide={1}
					centeredSlides={true}
					speed={800}
					pagination={{
						clickable: true,
					}}
					onSlideChange={() => {
						setActiveIndex(swiperRef.current?.activeIndex)
					}}
					breakpoints={{
						300: {
							slidesPerView: 1,
						},
						1024: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
					}}
					onBeforeInit={(swiper) => {
						swiperRef.current = swiper
					}}
					draggable
				>
					{data.items.map((review, i) => (
						<SwiperSlide key={review.id}>
							<ReviewItem
								active={i == activeIndex}
								review={review}
							/>
						</SwiperSlide>
					))}
					<div className='flex w-full justify-end gap-compact'>
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
			)}
		</>
	)
}

function ReviewItem({ active, review }: { active?: boolean; review: ReviewItemData }) {
	const { star, avatar, content, created_at, firstName, lastName } = review
	return (
		<div
			className={clsx(
				'flex-col-start w-full gap-compact rounded-[16px] border-[2px] border-primary-5555 bg-neutral-gray-1 p-comfortable transition-all duration-[0.8s] ease-in-out',
				{
					'scale-90 opacity-30': !active,
				},
			)}
		>
			<div className='flex justify-between'>
				<div className='flex gap-cozy'>
					<span className='relative aspect-square h-[60px] overflow-hidden rounded-[100%] bg-primary-5555'>
						<Image
							src={avatar ? avatar : DEFAULT_AVATAR}
							alt='customer avatar'
							fill
							style={{ objectFit: 'cover' }}
						/>
					</span>
					<div className='flex-col-start gap-compact'>
						<span className='text-body-md font-semi-bold text-primary-625'>{`${firstName} ${lastName}`}</span>
						<span className='text-body-sm text-primary-418'>Customer</span>
					</div>
				</div>
				<ChatBubbleBottomCenterTextIcon className='aspect-square h-[40px] text-primary-5555' />
			</div>
			<div className='flex-col-start gap-compact'>
				<div className='flex items-center gap-compact'>
					<div className='flex text-status-success'>
						{[...Array(star)].map((i) => (
							<StarIcon
								key={i}
								className='aspect-square h-[40px]'
							/>
						))}
					</div>
					<span className='text-body-xsm italic text-primary-418-60'>
						{formatDate(new Date(created_at))}
					</span>
				</div>
				<p className='text-body-md text-primary-418'>{content}</p>
			</div>
		</div>
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
				'group  aspect-square rounded-[50%]  bg-primary-625 p-compact text-neutral-gray-1 ',
			)}
			onClick={onClick}
		>
			{direction === 'next' ? (
				<ChevronRightIcon className='aspect-square h-[20px] transition duration-100 ease-in group-hover:translate-x-[2px]  ' />
			) : (
				<ChevronLeftIcon className='aspect-square h-[20px] transition duration-100 ease-in group-hover:translate-x-[-2px] ' />
			)}
		</button>
	)
}
