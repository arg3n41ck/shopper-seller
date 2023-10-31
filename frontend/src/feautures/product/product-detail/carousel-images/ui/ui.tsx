import React from 'react'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import { CustomNextButton, CustomPagination, CustomPrevButton, ProductDetailCarouselContainer } from './styles'
import { ChevronLeft, ChevronRight } from 'react-feather'
import Image from 'next/image'
import { TypeImageFile } from '@/shared/lib/types/sellerTypes'

SwiperCore.use([Navigation, Pagination])

interface CarouselProductProps {
  images: TypeImageFile[]
  uniqueCarouselId: string
}

export const ProductDetailCarouselIMages: React.FC<CarouselProductProps> = ({ images, uniqueCarouselId }) => {
  if (!images?.length) return null

  return (
    <ProductDetailCarouselContainer>
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
        }}
      >
        {images.map((item) => (
          <SwiperSlide key={item.id}>
            <Image src={item.image} width={252} height={315} alt={`${item.id}`} />
          </SwiperSlide>
        ))}
      </Swiper>

      <CustomPrevButton className={`product-carousel-slider-prev-${uniqueCarouselId}`}>
        <ChevronLeft size={40} />
      </CustomPrevButton>

      <CustomNextButton className={`product-carousel-slider-next-${uniqueCarouselId}`}>
        <ChevronRight size={40} />
      </CustomNextButton>

      <CustomPagination className={`swiper-pagination-${uniqueCarouselId}`} />
    </ProductDetailCarouselContainer>
  )
}
