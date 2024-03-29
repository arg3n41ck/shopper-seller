import React, { FC, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import SwiperCore from 'swiper'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from './styles.module.css'
import cn from 'classnames'
import { TypeImageFile } from '@/shared/lib/types/sellerTypes'
import Image from 'next/image'

SwiperCore.use([Navigation, Pagination])

interface CarouselProps {
  slides: TypeImageFile[]
  hovering: boolean
}

const Carousel: FC<CarouselProps> = ({ slides, hovering }) => {
  const prevRef = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLDivElement>(null)
  const sortedSlides = slides.slice().sort((a, b) => (b.is_main ? 1 : 0) - (a.is_main ? 1 : 0))

  return (
    <div className="relative max-h-[280px] max-w-[252px]">
      <div className={cn('flex items-center justify-center', styles.SwiperCr)}>
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {sortedSlides.map((item, index: number) => (
            <SwiperSlide key={index}>
              <Image
                className="h-[280px] w-full object-cover"
                src={typeof item.image === 'string' ? item.image : item.image.base64 || '/images/mock/child.png'}
                alt={`Slide #${item?.id}`}
                width={160}
                height={280}
              />
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
