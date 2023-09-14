import { useState, useEffect, useRef, FC } from "react";
import {
  BigImageWrapper,
  CarouselWrapper,
  MainWrapper,
  SmallImageWrapper,
  SmallImageInnerContainer,
  ScrollButton,
} from "./styles";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "react-feather";

interface Image {
  id: number;
  main_image: boolean;
  image_url: string;
}

interface CarouselWithMainImageProps {
  images: Image[];
}

const CarouselWithMainImage: FC<CarouselWithMainImageProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const sortedImages = [...images].sort(
    (a, b) => (b.main_image ? 1 : 0) - (a.main_image ? 1 : 0)
  );
  const carouselRef = useRef<HTMLDivElement | null>(null);

  const handleImageClick = (index: number) => {
    setActiveIndex(index);
    scrollToImage(index);
  };

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const targetImage = carouselRef.current.children[index];

      setTimeout(() => {
        targetImage.scrollIntoView({ behavior: "smooth", block: "nearest" });
      });
    }
  };

  const handleScroll = (direction: "up" | "down") => {
    if (direction === "up" && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      scrollToImage(activeIndex - 1);
    } else if (direction === "down" && activeIndex < sortedImages.length - 1) {
      setActiveIndex(activeIndex + 1);
      scrollToImage(activeIndex + 1);
    }
  };

  useEffect(() => {
    const mainImageIndex = sortedImages.findIndex(
      (image: Image) => image.main_image
    );
    setActiveIndex(mainImageIndex !== -1 ? mainImageIndex : 0);
    scrollToImage(mainImageIndex !== -1 ? mainImageIndex : 0);
  }, [images]);

  return (
    <MainWrapper>
      <CarouselWrapper>
        <ScrollButton
          $position="top"
          onClick={() => handleScroll("up")}
          disabled={activeIndex === 0}
        >
          <ChevronUp size={40} />
        </ScrollButton>

        <ScrollButton
          $position="bottom"
          onClick={() => handleScroll("down")}
          disabled={activeIndex === sortedImages.length - 1}
        >
          <ChevronDown size={40} />
        </ScrollButton>

        <SmallImageWrapper ref={carouselRef}>
          {sortedImages.map((image, index) => (
            <SmallImageInnerContainer
              key={image.id}
              onClick={() => handleImageClick(index)}
              className={`${activeIndex === index ? "active" : ""}`}
            >
              <Image
                src={image.image_url}
                alt={`Carousel image ${index}`}
                width={80}
                height={80}
              />
            </SmallImageInnerContainer>
          ))}
        </SmallImageWrapper>
      </CarouselWrapper>

      <BigImageWrapper>
        <Image
          src={sortedImages[activeIndex]?.image_url}
          alt={`Main carousel image`}
          width={476}
          height={563}
        />
      </BigImageWrapper>
    </MainWrapper>
  );
};

export default CarouselWithMainImage;
