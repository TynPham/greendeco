'use client'
import React, { useCallback, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper'
import NavigationButton from './navigation-button'

// Types
type ProductCarouselWrapperProps = {
  children: React.ReactNode[]
  breakpoints: Record<number, { slidesPerView: number }>
  navigationButtons?: boolean
}

export default function ProductCarouselWrapper({
  children,
  breakpoints,
  navigationButtons = true,
}: ProductCarouselWrapperProps) {
  const swiperRef = useRef<SwiperType>()

  const handlePrevClick = useCallback(() => {
    swiperRef.current?.slidePrev()
  }, [])

  const handleNextClick = useCallback(() => {
    swiperRef.current?.slideNext()
  }, [])

  const handleBeforeInit = useCallback((swiper: SwiperType) => {
    swiperRef.current = swiper
  }, [])

  return (
    <Swiper
      modules={[Navigation]}
      className='relative w-full'
      slidesPerView={1}
      spaceBetween={16}
      breakpoints={breakpoints}
      onBeforeInit={handleBeforeInit}
      draggable
      watchSlidesProgress
      updateOnWindowResize
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}

      {navigationButtons && (
        <>
          <NavigationButton
            onClick={handlePrevClick}
            direction='prev'
          />
          <NavigationButton
            onClick={handleNextClick}
            direction='next'
          />
        </>
      )}
    </Swiper>
  )
}
