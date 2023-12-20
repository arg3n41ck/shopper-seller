import React, { ReactNode } from 'react'
import SwiperCore from 'swiper'
import { Swiper } from 'swiper/react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Navigation, Pagination } from 'swiper/modules'

SwiperCore.use([Navigation, Pagination])

interface CarouselProductProps {
  children: ReactNode
  uniqueCarouselId: string
}

export const HorizontalCarousel: React.FC<CarouselProductProps> = ({ children, uniqueCarouselId }) => {
  return (
    <>
      <Swiper
        spaceBetween={40}
        navigation={{
          prevEl: `.product-carousel-slider-prev-${uniqueCarouselId}`,
          nextEl: `.product-carousel-slider-next-${uniqueCarouselId}`,
        }}
        slidesPerView={'auto'}
        className="!m-0"
      >
        {children}
      </Swiper>

      <button
        className={`absolute left-[20px] top-1/2 z-10 flex h-[72px] w-[72px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-[#171717] text-[18px] text-[#fff] product-carousel-slider-prev-${uniqueCarouselId}`}
      >
        <ChevronLeft size={40} />
      </button>

      <button
        className={`absolute right-[20px] top-1/2 z-10 flex h-[72px] w-[72px] -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-none bg-[#171717] text-[18px] text-[#fff] product-carousel-slider-next-${uniqueCarouselId}`}
      >
        <ChevronRight size={40} />
      </button>
    </>
  )
}
