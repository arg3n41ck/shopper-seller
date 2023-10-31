import React, { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp } from 'react-feather'
import cn from 'classnames'
import { TypeImageFile } from '@/shared/lib/types/sellerTypes'

interface CarouselWithMainImageProps {
  images: TypeImageFile[]
}

export const CarouselWithMainImage: FC<CarouselWithMainImageProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const sortedImages = [...images].sort((a, b) => (b.main_image ? 1 : 0) - (a.main_image ? 1 : 0))
  const carouselRef = useRef<HTMLDivElement | null>(null)

  const handleImageClick = (index: number) => {
    setActiveIndex(index)
    scrollToImage(index)
  }

  const scrollToImage = (index: number) => {
    if (carouselRef.current) {
      const targetImage = carouselRef.current.children[index]

      setTimeout(() => {
        targetImage.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }
  }

  const handleScroll = (direction: 'up' | 'down') => {
    if (direction === 'up' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1)
      scrollToImage(activeIndex - 1)
    } else if (direction === 'down' && activeIndex < sortedImages.length - 1) {
      setActiveIndex(activeIndex + 1)
      scrollToImage(activeIndex + 1)
    }
  }

  useEffect(() => {
    const mainImageIndex = sortedImages.findIndex((image: TypeImageFile) => image.main_image)
    setActiveIndex(mainImageIndex !== -1 ? mainImageIndex : 0)
    scrollToImage(mainImageIndex !== -1 ? mainImageIndex : 0)
  }, [images])

  return (
    <div className="relative flex gap-[20px]">
      <div className="hideScrollbar max-h-[690px] overflow-y-scroll">
        <button
          className="absolute top-0 z-[2] flex h-[32px] w-[120px] items-center justify-center border-none bg-[rgba(23,23,23,0.32)] text-white outline-none"
          onClick={() => handleScroll('up')}
          disabled={activeIndex === 0}
        >
          <ChevronUp size={40} />
        </button>

        <button
          className="absolute bottom-0 z-[2] flex h-[32px] w-[120px] items-center justify-center border-none bg-[rgba(23,23,23,0.32)] text-white outline-none"
          onClick={() => handleScroll('down')}
          disabled={activeIndex === sortedImages.length - 1}
        >
          <ChevronDown size={40} />
        </button>

        <div className="flex flex-col gap-[12px]" ref={carouselRef}>
          {sortedImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => handleImageClick(index)}
              className={cn('w-[120px] opacity-[0.6] transition-all hover:opacity-100', {
                ['!opacity-100']: activeIndex === index,
              })}
            >
              <Image
                className="h-[120px] min-h-[103px] w-[120px] cursor-pointer object-cover"
                src={image.image}
                alt={`Carousel image ${index}`}
                width={80}
                height={80}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="h-[633px] w-[475px]">
        <Image
          className="h-full w-full object-cover"
          src={sortedImages[activeIndex]?.image}
          alt={`Main carousel image`}
          width={476}
          height={563}
        />
      </div>
    </div>
  )
}
