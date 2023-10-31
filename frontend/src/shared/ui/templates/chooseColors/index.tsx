import React, { FC } from 'react'
import Image from 'next/image'
import { TypeVariant, TypeVariants } from '@/shared/lib/types/sellerTypes'
interface ChooseColorsProps {
  variants: TypeVariants
  selectedVariant: TypeVariant
  onClick: (id: string) => void
}

const ChooseColors: FC<ChooseColorsProps> = ({ variants, onClick, selectedVariant }) => {
  return (
    <div>
      <p className="text-[16px] text-gray">
        Цвет: <span className="text-black">{selectedVariant?.title}</span>
      </p>

      <div className={'mt-3 flex gap-[16px]'}>
        {variants?.map((item: TypeVariant) => (
          <div className="h-[85px] w-[63px]" key={item.id} onClick={() => item?.slug && onClick(item.slug)}>
            <Image
              className="h-full w-full cursor-pointer"
              src={item.images[0]?.image}
              alt={`Image ${selectedVariant?.title}`}
              width={63}
              height={85}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChooseColors
