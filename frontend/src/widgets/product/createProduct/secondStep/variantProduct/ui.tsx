import React, { FC, useCallback, useState } from 'react'
import Carousel from '@/shared/ui/carousels/createProductCarousel'
import { TypeImageFile, TypeSizeQuantity, TypeVariant } from '@/shared/lib/types/sellerTypes'

interface VariantProps {
  data: TypeVariant
  selectVariant?: (variant: TypeVariant) => void
}

const VariantProduct: FC<VariantProps> = ({ data, selectVariant }: VariantProps) => {
  const [hovering, setHovering] = useState<boolean>(false)

  const handleMouseEnter = useCallback(() => setHovering(true), [])
  const handleMouseLeave = useCallback(() => setHovering(false), [])

  const convertedImages = data.images.map((item: TypeImageFile) => {
    // eslint-disable-next-line
    //@ts-ignore
    if (typeof window !== 'undefined' && (item.image instanceof File || item.image instanceof Blob)) {
      return {
        ...item,
        image: URL.createObjectURL(item.image),
      }
    }
    return item
  })

  if (!data?.title) return null

  return (
    <>
      <div
        className="flex h-full w-full max-w-[160px] cursor-pointer flex-col gap-6 hover:border-primaryDash900"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => selectVariant && selectVariant(data)}
      >
        <Carousel slides={convertedImages} hovering={hovering} />
        <div className="flex flex-col gap-3">
          <p className="text-[18px] font-[600] text-neutral-900">{data.title}</p>
          <p className="text-[14px] font-normal text-[#262626]">{data.description}</p>
          <div className="flex flex-wrap items-center gap-2">
            {!!data.size_variants?.length &&
              data.size_variants.map((item: TypeSizeQuantity, index: number) => (
                <div className="color-[#676767] text-[12px] font-normal" key={index}>
                  {item.size}
                </div>
              ))}
          </div>
          {/* <ResidueText>700 шт.</ResidueText> */}
          {/* <p className="text-[19.2px] font-[600] text-neutral-900">{data.price} сом</p> */}
        </div>
      </div>
    </>
  )
}

export default VariantProduct
