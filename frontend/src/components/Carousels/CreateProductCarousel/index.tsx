import { useRef, FC } from "react";
import { X, ChevronLeft, ChevronRight } from "react-feather";
import {
  StyledCarousel,
  StyledCarouselWrapper,
  DeleteIconContainer,
  StyledButtonLeft,
  StyledButtonRight,
} from "./styles";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { StyledImage } from "./styles";
import "swiper/css";

SwiperCore.use([Navigation, Pagination]);

interface CarouselProps {
  slides: any[];
  hovering: boolean;
  handleShowBackdrop: () => void;
}

const Carousel: FC<CarouselProps> = ({
  slides,
  hovering,
  handleShowBackdrop,
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const sortedSlides = slides
    .slice()
    .sort((a, b) => (b.main_image ? 1 : 0) - (a.main_image ? 1 : 0));

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
          {sortedSlides.map((item) => (
            <SwiperSlide key={item.id}>
              <StyledImage src={item.image_url} alt="asd" />
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
  );
};

export default Carousel;
