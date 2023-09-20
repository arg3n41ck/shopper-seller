import React, { FC, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from 'react-feather'
import SwiperCore from 'swiper'
import 'swiper/css'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
	DeleteIconContainer,
	StyledButtonLeft,
	StyledButtonRight,
	StyledCarousel,
	StyledCarouselWrapper,
	StyledImage,
} from './styles'

SwiperCore.use([Navigation, Pagination])

interface CarouselProps {
	slides: any[]
	hovering: boolean
	handleShowBackdrop: () => void
}

const Carousel: FC<CarouselProps> = ({
	slides,
	hovering,
	handleShowBackdrop,
}) => {
	const prevRef = useRef<HTMLDivElement>(null)
	const nextRef = useRef<HTMLDivElement>(null)
	const sortedSlides = slides
		.slice()
		.sort((a, b) => (b.main_image ? 1 : 0) - (a.main_image ? 1 : 0))

	return (
		<StyledCarouselWrapper>
			{hovering && (
				<DeleteIconContainer onClick={handleShowBackdrop}>
					<X />
				</DeleteIconContainer>
			)}

			<StyledCarousel>
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					navigation={{
						prevEl: prevRef.current,
						nextEl: nextRef.current,
					}}
					pagination={{ clickable: true }}
				>
					{sortedSlides.map(item => (
						<SwiperSlide key={item.id}>
							<StyledImage src={item.image_url} alt='asd' />
						</SwiperSlide>
					))}
				</Swiper>

				{!!slides?.length && (
					<>
						<StyledButtonLeft ref={prevRef}>
							{hovering && <ChevronLeft />}
						</StyledButtonLeft>
						<StyledButtonRight ref={nextRef}>
							{hovering && <ChevronRight />}
						</StyledButtonRight>
					</>
				)}
			</StyledCarousel>
		</StyledCarouselWrapper>
	)
}

export default Carousel
