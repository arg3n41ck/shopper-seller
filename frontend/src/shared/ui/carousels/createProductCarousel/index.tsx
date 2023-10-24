import React, { FC, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'react-feather'
import SwiperCore from 'swiper'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.css'
import cn from 'classnames'

SwiperCore.use([Navigation, Pagination])

interface CarouselProps {
  slides: any[]
  hovering: boolean
  handleShowBackdrop: () => void
}

const Carousel: FC<CarouselProps> = ({ slides, hovering, handleShowBackdrop }) => {
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const sortedSlides = slides.slice().sort((a, b) => (b.main_image ? 1 : 0) - (a.main_image ? 1 : 0))

  return (
    <div className="relative max-h-[280px] max-w-[252px]">
      {hovering && (
        <div
          className="absolute right-[5px] top-[5px] z-[2] cursor-pointer text-neutral-400"
          onClick={handleShowBackdrop}
        >
          <X />
        </div>
      )}

      <div className={cn('flex items-center justify-center', styles.SwiperCr)}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          pagination={{ clickable: true }}
        >
          {sortedSlides.map((item) => (
            <SwiperSlide key={item.id}>
              <img className="h-[280px] w-full object-cover" src={item.image_url} alt="asd" />
            </SwiperSlide>
          ))}
        </Swiper>

        {!!slides?.length && (
          <>
            <div
              className="absolute left-0 z-[1] flex h-full cursor-pointer items-center pl-[5px] text-neutral-400"
              ref={prevRef}
            >
              {hovering && <ChevronLeft />}
            </div>
            <div
              className="absolute right-0 z-[1] flex h-full cursor-pointer items-center pr-[5px] text-neutral-400"
              ref={nextRef}
            >
              {hovering && <ChevronRight />}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Carousel
