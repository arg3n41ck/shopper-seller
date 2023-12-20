import React from 'react'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'react-feather'
import Image from 'next/image'
import { TypeImageFile } from '@/shared/lib/types/sellerTypes'
import cl from 'classnames'

SwiperCore.use([Navigation, Pagination])

interface CarouselProductProps {
  images: TypeImageFile[] | undefined
  uniqueCarouselId: string
}

const renderCustomBullet = (index: number, className: string) => {
  return `<span key=${index} class="!mt-5 !w-[8px] !h-[8px] !bg-[#171717] !rounded-none
  ${className} 
  "></span>`
}

export const ProductDetailCarouselIMages: React.FC<CarouselProductProps> = ({ images, uniqueCarouselId }) => {
  if (!images?.length) return null

  return (
    <div className="relative h-[343px] max-w-[340px] overflow-hidden">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        navigation={{
          prevEl: `.product-carousel-slider-prev-${uniqueCarouselId}`,
          nextEl: `.product-carousel-slider-next-${uniqueCarouselId}`,
        }}
        pagination={{
          el: `.swiper-pagination-${uniqueCarouselId}`,
          clickable: true,
          renderBullet: renderCustomBullet,
        }}
      >
        {images.map((item) => {
          const src =
            typeof item.image === 'string'
              ? item.image
              : item.image && item.image.base64
                ? item.image.base64
                : '/images/mock/child.png'

          return (
            <SwiperSlide
              key={item.id}
              className="
            !flex justify-center bg-none text-center text-[18px]"
            >
              <Image
                src={src}
                width={252}
                height={315}
                alt={`${item.id}`}
                className="h-[315px] w-[252px] object-cover"
              />
            </SwiperSlide>
          )
        })}
      </Swiper>

      <button
        className={cl(
          'absolute left-0 top-1/2 z-10 flex h-[36px] w-[36px] -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-[#171717] text-[18px] text-white',
          `product-carousel-slider-prev-${uniqueCarouselId}`,
        )}
      >
        <ChevronLeft size={40} />
      </button>

      <button
        className={cl(
          'absolute right-0 top-1/2 z-10 flex h-[36px] w-[36px] -translate-y-1/2 cursor-pointer items-center justify-center border-none bg-[#171717] text-[18px] text-white',
          `product-carousel-slider-next-${uniqueCarouselId}`,
        )}
      >
        <ChevronRight size={40} />
      </button>

      <div className={cl('!bottom-0 !flex !w-full !justify-center', `swiper-pagination-${uniqueCarouselId}`)} />
    </div>
  )
}
