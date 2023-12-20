import React, { FC } from 'react'
import Image from 'next/image'
import { TypeVariant, TypeVariants } from '@/shared/lib/types/sellerTypes'

interface ChooseColorsProps {
  variants: TypeVariants
  selectedVariant: TypeVariant
  onClick: (index: number) => void
}

const ChooseColors: FC<ChooseColorsProps> = ({ variants, onClick, selectedVariant }) => {
  return (
    <div>
      <p className="text-[16px] text-gray">
        Цвет: <span className="text-black">{selectedVariant?.title}</span>
      </p>

      <div className={'mt-3 flex gap-[16px]'}>
        {variants?.map((variant: TypeVariant, index: number) => {
          const image = variant.images[0]?.image

          return (
            <div className="h-[85px] w-[63px]" key={index} onClick={() => onClick(index)}>
              <Image
                className="h-full w-full cursor-pointer"
                // eslint-disable-next-line
                // @ts-ignore
                src={image instanceof File ? URL.createObjectURL(image) : image.base64 || '/images/mock/child.png'}
                alt={`Image ${selectedVariant?.title}`}
                width={63}
                height={85}
                layout="responsive"
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ChooseColors
